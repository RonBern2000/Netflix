import { CancelationDetails } from "../dto/cancelation-details";
import { IUser } from "./IUser";

export interface IUserService{
    //updateUser(id: string): Promise<IUser | null>;
    getPayPalAccessToken(): Promise<string>;
    createPayPalSubscription(): Promise<any>;
    getSubscriptionIdAndSave(userId: string, subscriptionId: string): Promise<void>
    cancelSubscription(cancelationDetails: CancelationDetails): Promise<boolean>;
}