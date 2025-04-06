import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserService } from "../interfaces/IUserService";
import { authSchema, emailSchema } from "../DTOs/schema";
import { BadRequestError } from "@netflix-utils/shared";

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    async checkEmailExist(req: Request, res: Response, next: NextFunction){
        try {
            const result = await emailSchema.safeParseAsync(req.body);

            if(!result.success){
                throw new BadRequestError("Invalid sanitation"); 
            }
            const isExist = await this.userService.checkUserExist(result.data.email);
    
            res.status(200).json({ isExist });
        } catch (error) {
            return next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const result = await authSchema.safeParseAsync(req.body);
            
            if(!result.success){
                throw new BadRequestError("Invalid sanitation"); 
            }

            const {token, active} = await this.userService.login(result.data);

            if (active)
            {
                res.cookie(TOKENS.token, `${TOKENS.Bearer} ${token}`, {
                    httpOnly: true
                });
                res.status(200).json({message: "Login Successful", token: `Bearer ${token}`, active: active});
            }
            res.cookie(TOKENS.tempToken, `${TOKENS.Bearer} ${token}`, {
                httpOnly: true
            });
            res.status(200).json({message: "Login Successful", token: `${TOKENS.Bearer} ${token}`, active: active});
        } catch (error) {
            return next(error);
        }
    }
    async signup(req: Request, res: Response, next: NextFunction){
        try {
             const result = await authSchema.safeParseAsync(req.body);
            
            if(!result.success){
                throw new BadRequestError("Invalid sanitation"); 
            }

            const token: string = await this.userService.signup(result.data);

            res.cookie(TOKENS.tempToken, `Bearer ${token}`, {
                httpOnly: true
            });
            res.status(200).json({message: "Signup Successful", token: `${TOKENS.Bearer} ${token}`});
        } catch (error) {
            return next(error);
        }
    }
}