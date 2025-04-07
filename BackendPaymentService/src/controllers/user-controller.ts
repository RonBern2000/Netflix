import {inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import { IUserService } from '../interfaces/IUserService';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

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