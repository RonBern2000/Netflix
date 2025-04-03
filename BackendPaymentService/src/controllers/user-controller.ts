import {inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import { IUserService } from '../interfaces/IUserService';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    // TODO: the proxy should give this service the id from the cookie
    async pay(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.body;
            const user: IUser | null = await this.userService.pay(id); 
            if(!user)
                res.status(400).json({message: "Payment was not Successful"});

            res.status(204).json({message: "Payment Successful"});
        } catch (error) {
            return next(error);
        }
    }
}