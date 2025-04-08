import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserRepository } from '../interfaces/IUserRepository'
import { IUserService } from "../interfaces/IUserService";
import { IUser } from "../interfaces/IUser";
import { BadRequestError, Exchanges } from "@netflix-utils/shared";
import { rabbit } from "../config/rabbit";
import { CancelationDetails } from "../dto/cancelation-details";

@injectable()
export class UserService implements IUserService{
    constructor(@inject(TOKENS.IUserRepository) private userRepository: IUserRepository){}
    async getPayPalAccessToken(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async createPayPalSubscription(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async cancelSubscription(cancelationDetails: CancelationDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    // Only for testing without Paypal
    async pay(id: string): Promise<IUser | null> {
        const user: IUser | null = await this.userRepository.pay(id);

        if(!user){
            throw new BadRequestError("Error updating user's status");
        }

        await rabbit.publishMessage(Exchanges.User, 'pay' ,{ id: user.id, active: user.active });

        return user;
    }
}