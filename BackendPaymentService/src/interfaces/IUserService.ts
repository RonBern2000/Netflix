import { CancelationDetails } from "../dto/cancelation-details";
import { IUser } from "./IUser";

export interface IUserService{
    pay(id: string): Promise<IUser | null>;
    getPayPalAccessToken(): Promise<string>;
    createPayPalSubscription(): Promise<any>;
    cancelSubscription(cancelationDetails: CancelationDetails): Promise<boolean>;
}