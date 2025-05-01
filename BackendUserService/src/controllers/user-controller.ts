import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserService } from "../interfaces/IUserService";
import { authSchema, emailSchema } from "../DTOs/schema";
import { BadRequestError} from "@netflix-utils/shared";

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    async checkStatus(req: Request, res: Response, next: NextFunction){
        try {
            const refreshToken = req.cookies[TOKENS.token] || req.cookies[TOKENS.tempToken];
            const decoded = await this.userService.verify(refreshToken);
            return res.status(200).json({active: decoded.active});
        } catch (error) {
            return next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction){
        try {
            const refreshToken = req.cookies[TOKENS.token] || req.cookies[TOKENS.tempToken];

            if(!refreshToken){
                return res.status(401).json({message: 'Access Denied'});
            }
            const accessToken = await this.userService.refresh(refreshToken);

            res.header('authorization', accessToken);
            return res.status(200).json({ accessToken });
        } catch (error) {
            return next(error);
        }
    }

    async checkEmailExist(req: Request, res: Response, next: NextFunction){
        try {
            const result = await emailSchema.safeParseAsync(req.body);

            if(!result.success){
                throw new BadRequestError("Invalid sanitation"); 
            }
            const isExist = await this.userService.checkUserExist(result.data.email);
    
            return res.status(200).json({ isExist });
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

            const {accessToken ,refreshToken , active} = await this.userService.login(result.data);

            if (active)
            {
                res.cookie(TOKENS.token, `${TOKENS.Bearer} ${refreshToken}`, {
                    httpOnly: true,
                    sameSite: 'strict',
                });
                res.header('authorization', accessToken);
                return res.status(200).json({message: "Login Successful", accessToken: `${TOKENS.Bearer} ${accessToken}`, active: active});
            }
            res.cookie(TOKENS.tempToken, `${TOKENS.Bearer} ${refreshToken}`, {
                httpOnly: true,
                sameSite: 'strict',
            });
            res.header('authorization', accessToken);
            return res.status(200).json({message: "Login Successful", accessToken: `${TOKENS.Bearer} ${accessToken}`, active: active});
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

            const {accessToken, refreshToken} = await this.userService.signup(result.data);

            res.cookie(TOKENS.tempToken, `${TOKENS.Bearer} ${refreshToken}`, {
                httpOnly: true,
                sameSite: 'strict',
            });
            res.header('authorization', accessToken);
            return res.status(200).json({message: "Signup Successful", accessToken: `${TOKENS.Bearer} ${accessToken}`});
        } catch (error) {
            return next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try {
            for (const cookieName in req.cookies) {
                res.clearCookie(cookieName, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                });
            }
            return res.status(200).json({message: "Logout Successful"});
        } catch (error) {
            return next(error);
        }
    }
}