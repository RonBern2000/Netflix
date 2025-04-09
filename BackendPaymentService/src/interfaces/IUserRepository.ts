import { IUser } from "./IUser";

export interface IUserRepository{
    getUser(id: string): Promise<IUser | null>;
    updateUser(id: string,subscriptionId: string): Promise<IUser | null>;
    //updateSubscriptionId(id: string, subscriptionId: string): Promise<IUser | null>;
}