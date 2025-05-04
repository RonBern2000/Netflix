import axios from "axios";
import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserRepository } from '../interfaces/IUserRepository'
import { IUserService } from "../interfaces/IUserService";
import { IUser } from "../interfaces/IUser";
import { BadRequestError, Exchanges } from "@netflix-utils/shared";
import { rabbit } from "../config/rabbit";
import { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE_URL, PAYPAL_PLAN_ID} from "../config/env";
import { CancelationDetails } from "../dto/cancelation-details";

@injectable()
export class UserService implements IUserService{
    constructor(@inject(TOKENS.IUserRepository) private userRepository: IUserRepository){}

    async getPayPalAccessToken(): Promise<string> {
      const response = await axios({
        url: `${PAYPAL_API_BASE_URL}/v1/oauth2/token`,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: 'grant_type=client_credentials',
        auth: {
          username: PAYPAL_CLIENT_ID!,
          password: PAYPAL_SECRET!,
        },
      });

      return response.data.access_token;
    }

    async createPayPalSubscription(): Promise<any> {
      const token = await this.getPayPalAccessToken(); // Get the PayPal access token
      if(!token){
        throw new BadRequestError('token not found');
      }
      const response = await axios.post(`${process.env.PAYPAL_API_BASE_URL}/v1/billing/subscriptions`,
        {
          plan_id: PAYPAL_PLAN_ID,
          application_context: {
            brand_name: "Netflix",
            locale: "en-US",
            shipping_preference: "NO_SHIPPING",
            user_action: "SUBSCRIBE_NOW",
            return_url: `http://www.net-flex-prod.site/signup/payment?paypal_return=success`,
            cancel_url: "http://www.net-flex-prod.site/signup/payment?paypal_return=cancel"
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );  
            
      const approvalUrl = response.data.links.find((link: { rel: string, href: string }) => link.rel === 'approve')?.href;
      const subscriptionId = response.data.id;
        
      if (!approvalUrl) {
        throw new BadRequestError('Approval URL not found in PayPal response');
      }
      if (!subscriptionId) {
        throw new BadRequestError('Subscription ID not found in PayPal response');
      }

      return { approvalUrl, subscriptionId };  // Return the approval URL to redirect the user to PayPal
    }
    
    async cancelSubscription(cancelationDetails: CancelationDetails): Promise<boolean> {
      const token = await this.getPayPalAccessToken();
      if(!token){
        throw new BadRequestError('token not found');
      }
      const response = await axios.post(`${PAYPAL_API_BASE_URL}/v1/billing/subscriptions/${cancelationDetails.subscriptionId}/cancel`,
        { reason: cancelationDetails.reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.status === 204;
    }

    async getSubscriptionIdAndSave(userId: string, subscriptionId: string): Promise<void> {
      if (!subscriptionId || !userId) {
        throw new BadRequestError("Missing subscription ID or user ID");
      }
    
      const user = await this.userRepository.getUser(userId);
      if (!user) {
        throw new BadRequestError("User not found");
      }
    
      const payingUser = await this.userRepository.updateUser(userId,subscriptionId); // or save/update logic as per your DB setup

      if(!payingUser){
        throw new BadRequestError("Error updating user's status");
      }

      await rabbit.publishMessage(Exchanges.User, 'pay' ,{ id: payingUser.id, active: payingUser.active });
    }
}