import { Response, Request, NextFunction } from "express";
import { createPayPalSubscription, cancelSubscription } from '../services/paypal-service';

export const PaymentController = {
  async Subscribe(req: Request, res: Response) {
    try {
      const order = await createPayPalSubscription();  // Call the service function to create the order
      res.json(order);  // Return the created order to the client
    } catch (err) {
      res.status(500).json({ error: 'Failed to create PayPal order', details: err});
    }
  },
};

export async function cancelSubscriptionController(req: Request, res: Response) {
    const { subscriptionId } = req.body;
  
    if (!subscriptionId) {
      return res.status(400).json({ error: 'Missing subscriptionId' });
    }
  
    try {
      const success = await cancelSubscription(subscriptionId);
  
      if (success) {
        return res.status(200).json({ message: 'Subscription cancelled successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to cancel subscription' });
      }
    } catch (error: any) {
      console.error('Cancel error:', error.message);
      res.status(500).json({ error: 'Something went wrong cancelling the subscription' });
    }
  }
 // I-AMFK8LNRK6L5