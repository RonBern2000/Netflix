import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE_URL, PAYPAL_PLAN_ID} = process.env;

if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET || !PAYPAL_API_BASE_URL) {
    throw new Error("Missing PayPal configuration in .env file");
}

// Function to create and get an access token to communicate with paypal
export async function getPayPalAccessToken(): Promise<string> {
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

// Function to create a billing agreement (user subscribes to an existing plan)
export async function createPayPalSubscription(): Promise<any> {
    const token = await getPayPalAccessToken(); // Get the PayPal access token
  
    try {
        const response = await axios.post(`${process.env.PAYPAL_API_BASE_URL}/v1/billing/subscriptions`,
            {
                plan_id: PAYPAL_PLAN_ID,
                application_context: {
                  brand_name: "Netflix",
                  locale: "en-US",
                  shipping_preference: "NO_SHIPPING",
                  user_action: "SUBSCRIBE_NOW",
                  return_url: "http://localhost:3000/browse",
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

export async function cancelSubscription(subscriptionId: string, reason = 'User requested cancellation') {
    const token = await getPayPalAccessToken();
  
    const response = await axios.post(`${PAYPAL_API_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.status === 204;
}
