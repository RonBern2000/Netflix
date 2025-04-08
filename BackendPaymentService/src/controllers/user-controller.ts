import {inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import { IUserService } from '../interfaces/IUserService';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    async subscribe(req: Request, res: Response,  next: NextFunction) {
        try {
          const order = await this.userService.createPayPalSubscription();  // Call the service function to create the order
          res.status(200).json({order});  // Return the created order to the client
        } catch (error) {
            return next(error);
        }
    }

    async cancelSubscriptionController(req: Request, res: Response,  next: NextFunction) {
        const { subscriptionId } = req.body;
      
        if (!subscriptionId) {
          res.status(400).json({ error: 'Missing subscriptionId' });
        }
      
        try {
          const success = await this.userService.cancelSubscription(subscriptionId);
      
          if (success) {
            res.status(200).json({ message: 'Subscription cancelled successfully' });
          } else {
            res.status(500).json({ error: 'Failed to cancel subscription' });
          }
        } catch (error: any) {
            return next(error);
        }
    }

    async pay(req: Request, res: Response, next: NextFunction){
        console.log("cotroller action here");
        try {
            const userId = req.headers['x-user-id'];
            console.log(userId);
            let user: IUser | null = null;
            if(typeof userId === 'string')
                user = await this.userService.pay(userId); 
            if(!user)
                res.status(400).json({message: "Payment was not Successful"});

            res.status(204).json({message: "Payment Successful"});
        } catch (error) {
            return next(error);
        }
    }
}