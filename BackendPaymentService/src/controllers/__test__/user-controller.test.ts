import request from 'supertest';
import { app } from '../../app';
import casual from 'casual';
import { User } from '../../models/user-sql-entity';
import nock from 'nock';
import { PAYPAL_API_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET } from '../../config/env';


describe("Tests for USER CONTROLLER", () => {

    describe('PayPal API', () => {
        it('should return approvalUrl and subscriptionId when PayPal subscription is created', async () => {
            // Mock the access token request
            nock(PAYPAL_API_BASE_URL!)
              .post('/v1/oauth2/token')
              .basicAuth({ user: PAYPAL_CLIENT_ID!, pass: PAYPAL_SECRET })
              .reply(200, { access_token: 'mock-access-token' });
        
            // Mock the subscription creation request
            nock(PAYPAL_API_BASE_URL!)
              .post('/v1/billing/subscriptions')
              .matchHeader('Authorization', 'Bearer mock-access-token')
              .reply(201, {
                id: 'I-MOCKSUBSCRIPTIONID',
                links: [
                  { rel: 'approve', href: 'https://paypal.com/checkoutnow?token=MOCKTOKEN' }
                ]
              });
        
            const response = await request(app).get('/payments/subscribe');
        
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('approvalUrl');
            expect(response.body).toHaveProperty('subscriptionId');
            expect(response.body.approvalUrl).toBe('https://paypal.com/checkoutnow?token=MOCKTOKEN');
            expect(response.body.subscriptionId).toBe('I-MOCKSUBSCRIPTIONID');
          });
    });
    
    // describe("subscribe", () => {
    //     it("Should return 200 if subscribed successfully", async () => {
    //         const response = await request(app).get("/payments/subscribe");

    //         expect(response.status).toBe(200);
    //     });
    // });

    // describe("paymentSuccess", () => {
    //     it("Should return 200 if payment paid successfully", async () => {
    //         const user = {
    //             id: casual.uuid,
    //             email: casual.email,
    //             password: casual.password,
    //         };

    //         await User.create(user);
            
    //         const responseSubscription = await request(app).get("/payments/subscribe");
    //         const { subscriptionId } = responseSubscription.body;

    //         const response = await request(app).post("/payments/paymentSuccess").query({
    //             subscription_id: subscriptionId
    //         }).set('x-user-id', user.id);

    //         expect(response.status).toBe(200);
    //     });
    // });

    // describe('cancelSubscriptionController', () => { 
    //     it("Should return 200 if canceled sucbscription successfully", async () => {
    //         await request(app).post("/payments/cancelSubscription").send({
    //             email: 'test@test.com',
    //             password: 'test123'
    //         });

    //         const response = await request(app).post("/users/login").send({
    //             email: 'test@test.com',
    //             password: 'test123'
    //         });
    //         expect(response.status).toBe(200);
    //     });
    // });
});