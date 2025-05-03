import { inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import { IUserService } from '../interfaces/IUserService';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    async subscribe(req: Request, res: Response, next: NextFunction) {
        try {
          const {approvalUrl, subscriptionId } = await this.userService.createPayPalSubscription();  // Call the service function to create the order
          return res.status(200).json({approvalUrl, subscriptionId});  // Return the created order to the client
        } catch (error) {
            return next(error);
        }
    }

    async paymentSuccess(req: Request, res: Response, next: NextFunction){
      const subscriptionId = req.query.subscription_id as string;
      const userId = req.headers['x-user-id'];
      console.log(userId);
  
      if (!subscriptionId || !userId) {
        return res.status(400).send("Payment unsuccessful!");
      }
  
      try {
        // Save the subscriptionId to the user in the database
        if(typeof userId === 'string')
          await this.userService.getSubscriptionIdAndSave(userId, subscriptionId);

        for (const cookieName in req.cookies) {
          res.clearCookie(cookieName, {
              path: '/',
              httpOnly: true,
              sameSite: 'strict',
          });
        }
        // Redirect to frontend page
        return res.redirect(`http://www.net-flex-prod.site/login`);
      } catch (error) {
          return next(error);
      }
    }

    async cancelSubscriptionController(req: Request, res: Response,  next: NextFunction) {
        const cancelationDetails = req.body;
      
        if (!cancelationDetails.subscriptionId) {
          return res.status(400).json({ error: 'Missing subscriptionId' });
        }
      
        try {
          const success = await this.userService.cancelSubscription(cancelationDetails);
      
          if (success) {
             return res.status(200).json({ message: 'Subscription cancelled successfully' });
          } else {
             return res.status(500).json({ error: 'Failed to cancel subscription' });
          }
        } catch (error: any) {
            return next(error);
        }
    }

    // async pay(req: Request, res: Response, next: NextFunction){
    //     console.log("cotroller action here");
    //     try {
    //         const userId = req.headers['x-user-id'];
    //         console.log(userId);
    //         let user: IUser | null = null;
    //         if(typeof userId === 'string')
    //             user = await this.userService.pay(userId); 
    //         if(!user)
    //             res.status(400).json({message: "Payment was not Successful"});

    //         res.status(204).json({message: "Payment Successful"});
    //     } catch (error) {
    //         return next(error);
    //     }
    // }
}