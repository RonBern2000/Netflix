import request from 'supertest';
import { app } from '../../app';
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
});