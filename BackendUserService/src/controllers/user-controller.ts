import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { LoginRequestDTO } from "../DTOs/login-dto";
import { TOKENS } from "../tokens";
import { IUserService } from "../interfaces/IUserService";
import { SignupRequestDTO } from "../DTOs/signup-dto";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_KEY } from "../config/env";

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    async checkEmailExist(req: Request, res: Response, next: NextFunction){
        const { email } = req.body;

        const isExist = await this.userService.checkUserExist(email);

        res.status(200).json({ isExist });
    }

    async login(req: Request, res: Response, next: NextFunction){
        // TODO: More logic if its an active user or inactive
        try {
            const data: LoginRequestDTO = req.body;
            
            const token: string = await this.userService.login(data);
            const decoded = jwt.verify(token, JWT_KEY!);

            if (typeof decoded === 'object' && decoded !== null && 'active' in decoded) {
                if (decoded.active === true)
                {
                    console.log(`User active status: ${decoded.active}`);
                    res.cookie(TOKENS.token, token, {
                        httpOnly: true
                    });
                    res.status(200).json({message: "Login Successful", token: `Bearer ${token}`, active: decoded.active});
                }
                else
                {
                    res.cookie(TOKENS.tempToken, token, {
                        httpOnly: true
                    });
                    res.status(200).json({message: "Login Successful", tempToken: `Bearer ${token}`, active: decoded.active});
                }
            } else {
            console.error('Token is invalid or does not contain "active" property.');
            }
            // res.cookie(TOKENS.token, token, {
            //     httpOnly: true
            // });
            // res.status(200).json({message: "Login Successful", token: `Bearer ${token}`, active: (decoded as JwtPayload).active});
        } catch (error) {
            return next(error);
        }
    }
    async signup(req: Request, res: Response, next: NextFunction){
        try {
            const data: SignupRequestDTO = req.body;

            const token: string = await this.userService.signup(data);

             res.cookie(TOKENS.tempToken, token, {
                httpOnly: true
            });
            res.status(200).json({message: "Signup Successful", tempToken: `Bearer ${token}`});
        } catch (error) {
            return next(error);
        }
    }
}