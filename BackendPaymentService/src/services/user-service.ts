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
        try {
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
        } catch (error: any) {
          console.error('Failed to get PayPal access token:', error.response?.data || error.message);
          throw new Error('Could not retrieve PayPal access token');
        }
    }

    async createPayPalSubscription(): Promise<any> {
        const token = await this.getPayPalAccessToken(); // Get the PayPal access token
  
        try {
            const response = await axios.post(`${process.env.PAYPAL_API_BASE_URL}/v1/billing/subscriptions`,
                {
                    plan_id: PAYPAL_PLAN_ID,
                    application_context: {
                      brand_name: "Netflix",
                      locale: "en-US",
                      shipping_preference: "NO_SHIPPING",
                      user_action: "SUBSCRIBE_NOW",
                      return_url: "http://localhost:3000/landing",
                      cancel_url: "http://localhost:3000/signup/payment"
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
          
          if (!approvalUrl) {
            throw new Error('Approval URL not found in PayPal response');
          }
          console.log(approvalUrl)
          return approvalUrl;  // Return the approval URL to redirect the user to PayPal
        } catch (error: any) {
          console.error('Failed to create PayPal billing agreement:', error.response?.data || error.message);
          throw new Error('Could not create PayPal billing agreement'); 
        }
    }
    
    async cancelSubscription(cancelationDetails: CancelationDetails): Promise<boolean> {
        const token = await this.getPayPalAccessToken();
  
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