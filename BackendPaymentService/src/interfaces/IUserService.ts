import { CancelationDetails } from "../dto/cancelation-details";
export interface IUserService{
    getPayPalAccessToken(): Promise<string>;
    createPayPalSubscription(): Promise<any>;
    getSubscriptionIdAndSave(userId: string, subscriptionId: string): Promise<void>
    cancelSubscription(cancelationDetails: CancelationDetails): Promise<boolean>;
}