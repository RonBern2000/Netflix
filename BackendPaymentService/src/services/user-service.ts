import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserRepository } from '../interfaces/IUserRepository'
import { IUserService } from "../interfaces/IUserService";
import { IUser } from "../interfaces/IUser";
import { BadRequestError } from "@netflix-utils/shared";

@injectable()
export class UserService implements IUserService{
    constructor(@inject(TOKENS.IUserRepository) private userRepository: IUserRepository){}

    async pay(id: string): Promise<IUser | null> {
        const user: IUser | null = await this.userRepository.pay(id);

        if(!user){
            throw new BadRequestError("Error updating user's status");
        }

        //TODO: Rabbitmq logic

        return user;
    }
}