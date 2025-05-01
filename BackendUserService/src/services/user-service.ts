import { inject, injectable } from "inversify";
import {compare, hash} from "../utils/bcrypt"
import { IUserService } from "../interfaces/IUserService";
import { TOKENS } from "../tokens";
import { IUserRepository } from "../interfaces/IUserRepository";;
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { IUser } from "../interfaces/IUser";
import { BadRequestError, Exchanges, verify } from "@netflix-utils/shared";
import { IUserPayload } from "../interfaces/IUserPayload";
import { ILoginResponse } from "../interfaces/ILoginResponse";
import { rabbit } from "../config/rabbit";
import { AuthFormData } from "../DTOs/schema";
import { ISignupResponse } from "../interfaces/ISignupResponse";
import { JWT_KEY } from "../config/env";

@injectable()
export class UserService implements IUserService{

    constructor(@inject(TOKENS.IUserRepository) private userRepository: IUserRepository){}
    async verify(refreshToken: string): Promise<IUserPayload> {
        const decoded = verify(refreshToken, JWT_KEY!);
        if(!decoded)
            throw new BadRequestError('Invalid refreshToken.');
        return decoded;
    }
    
    async findUser(id: string): Promise<boolean> {
        const user = await this.userRepository.findUserById(id);
        if(!user){
            throw new BadRequestError('User was not found.');
        }
        return user.active ? true : false;
    }

    async refresh(refreshToken: string): Promise<string> {
        const decoded = verify(refreshToken, JWT_KEY!);
        if(!decoded){
            throw new BadRequestError('Invalid refreshToken');
        }
        const payload: IUserPayload = { id: decoded.id, email: decoded.email, active: decoded.active};
        const accessToken = signAccessToken(payload);
        return accessToken;
    }

    async checkUserExist(email: string): Promise<boolean> {
        const existingUser: IUser | null = await this.userRepository.findUserByEmail(email);
        return existingUser ? true : false;
    }

    async signup(data: AuthFormData): Promise<ISignupResponse> {
        const { email, password } = data;
        const existingUser: IUser | null = await this.userRepository.findUserByEmail(email);
        if(existingUser){
            throw new BadRequestError("User already exists");
        }

        const hashedPassword = await hash(password);

        const newUser : IUser | null = await this.userRepository.create({
            email,
            password: hashedPassword,
        });

        if(!newUser){
            throw new BadRequestError("Error in user creation");
        }

        await rabbit.publishMessage(Exchanges.User, 'signup' ,{ id: newUser.id, active: newUser.active });

        const payload: IUserPayload = {
            id: newUser.id,
            email: newUser.email,      
            active: newUser.active
        };

        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        return {accessToken, refreshToken, };
    }
    
    async login(data: AuthFormData): Promise<ILoginResponse> {
        const { email, password} = data;
        const existingUser = await this.userRepository.findUserByEmail(email);
        if(!existingUser){
            throw new BadRequestError("User not found");
        }
        const isValidPassword: boolean = await compare(password, existingUser.password);

        if(!isValidPassword){
            throw new BadRequestError("Invalid password");
        }

        const payload: IUserPayload = {
            id: existingUser.id,
            email: existingUser.email,      
            active: existingUser.active
        };

        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        return {accessToken, refreshToken ,active: existingUser.active};
    }
}