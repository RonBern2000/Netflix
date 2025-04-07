import { inject, injectable } from "inversify";
import {compare, hash} from "../utils/bcrypt"
import { IUserService } from "../interfaces/IUserService";
import { TOKENS } from "../tokens";
import { IUserRepository } from "../interfaces/IUserRepository";;
import { sign } from "../utils/jwt";
import { IUser } from "../interfaces/IUser";
import { BadRequestError, Exchanges } from "@netflix-utils/shared";
import { IUserPayload } from "../interfaces/IUserPayload";
import { ILoginResponse } from "../interfaces/ILoginResponse";
import { RabbitMQClient } from "@netflix-utils/shared/build/utils/rabbitmq";
import { rabbit } from "../config/rabbit";
import { AuthFormData } from "../DTOs/schema";

@injectable()
export class UserService implements IUserService{

    constructor(
        @inject(TOKENS.IUserRepository) private userRepository: IUserRepository){}

    async checkUserExist(email: string): Promise<boolean> { // מיותר?
        const existingUser: IUser | null = await this.userRepository.findUserByEmail(email);
        return existingUser ? true : false;
    }

    async signup(data: AuthFormData): Promise<string> {
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
            throw new Error("Error in user creation");
        }

        await rabbit.publishMessage(Exchanges.User, 'signup' ,{ id: newUser.id, active: newUser.active });

        return sign({ id: newUser.id, email: newUser.email, active: newUser.active} as IUserPayload);
    }
    
    async login(data: AuthFormData): Promise<ILoginResponse> {
        const { email, password} = data;
        const existingUser = await this.userRepository.findUserByEmail(email);

        if(!existingUser){
            throw new Error("User not found");
        }

        const isValidPassword: boolean = await compare(password, existingUser.password);

        if(!isValidPassword){
            throw new Error("Invalid password");
        }

        return {token: sign({ id: existingUser.id, email: existingUser.email, active: existingUser.active} as IUserPayload), active: existingUser.active};
    }
}