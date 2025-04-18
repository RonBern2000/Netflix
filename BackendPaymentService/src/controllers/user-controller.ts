import { inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import { IUserService } from '../interfaces/IUserService';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    async subscribe(req: Request, res: Response,  next: NextFunction) {
      console.log("enter to controller")
      //const userId = req.query.user_id as string;
        try {
          const aprovalUrl = await this.userService.createPayPalSubscription();  // Call the service function to create the order
          res.status(200).json(aprovalUrl);  // Return the created order to the client
        } catch (error) {
            return next(error);
        }
    }

    async paymentSuccess(req: Request, res: Response, next: NextFunction){
      const subscriptionId = req.query.subscription_id as string;
      const userId = req.query.user_id as string;
      //const userId = req.headers['x-user-id'];
      //console.log(userId);
  
      if (!subscriptionId || !userId) {
        res.status(400).send("Missing subscription_id or user_id");
      }
  
      try {
        // Save the subscriptionId to the user in the database
        if(typeof userId === 'string')
          await this.userService.getSubscriptionIdAndSave(userId, subscriptionId);

        // Redirect to frontend page
        res.redirect(`http://localhost:3000/landing`);
      } catch (error) {
          return next(error);
      }
    }

    async cancelSubscriptionController(req: Request, res: Response,  next: NextFunction) {
        const cancelationDetails = req.body;
      
        if (!cancelationDetails.subscriptionId) {
          res.status(400).json({ error: 'Missing subscriptionId' });
        }
      
        try {
          const success = await this.userService.cancelSubscription(cancelationDetails);
      
          if (success) {
            res.status(200).json({ message: 'Subscription cancelled successfully' });
          } else {
            res.status(500).json({ error: 'Failed to cancel subscription' });
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