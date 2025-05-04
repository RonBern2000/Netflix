import request from 'supertest';
import { app } from '../../app';
import { PAYPAL_API_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET } from '../../config/env';
import moxios from 'moxios';
import { User } from '../../models/user-sql-entity';
import casual from 'casual';


describe("Tests for USER CONTROLLER", () => {

    describe('subscribe', () => {
        it('should return approvalUrl and subscriptionId when PayPal subscription is created', async () => {
            // Mock the access token request
            moxios.stubRequest(`${PAYPAL_API_BASE_URL}/v1/oauth2/token`, {
                status: 200,
                response: {access_token: 'mock-access-token'}
            });
        
            // Mock the subscription creation request
            moxios.stubRequest(`${PAYPAL_API_BASE_URL}/v1/billing/subscriptions`, {
                status: 201,
                response: {
                    id: 'I-MOCKSUBSCRIPTIONID',
                    links: [
                      { rel: 'approve', href: 'https://paypal.com/checkoutnow?token=MOCKTOKEN' }
                    ]
                  }
            });
        
            const response = await request(app).get('/payments/subscribe');
        
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('approvalUrl');
            expect(response.body).toHaveProperty('subscriptionId');
            expect(response.body.approvalUrl).toBe('https://paypal.com/checkoutnow?token=MOCKTOKEN');
            expect(response.body.subscriptionId).toBe('I-MOCKSUBSCRIPTIONID');
          });
    });

    describe('paymentSuccess', () => {
        it('should return 200 if paied successfully', async () => {
            const user = {
                id: casual.uuid,
                email: casual.email,
                password: casual.password,
                active: true
            };

            await User.create(user);

            const response = await request(app).post('/payments/paymentSuccess').query({subscription_id: 'shit'}).set("x-user-id", user.id);
            expect(response.status).toBe(200);
        });
    });
});