import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { LoginRequestDTO } from "../DTOs/login-dto";
import { TOKENS } from "../tokens";
import { IUserService } from "../interfaces/IUserService";
import { SignupRequestDTO } from "../DTOs/signup-dto";

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    async checkEmailExist(req: Request, res: Response, next: NextFunction){
        const { email } = req.body;

        const isExist = await this.userService.checkUserExist(email);

        res.status(200).json({ isExist });
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const data: LoginRequestDTO = req.body;
            
            const {token, active} = await this.userService.login(data);

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
            const data: SignupRequestDTO = req.body;

            const token: string = await this.userService.signup(data);

            res.cookie(TOKENS.tempToken, `Bearer ${token}`, {
                httpOnly: true
            });
            res.status(200).json({message: "Signup Successful", token: `${TOKENS.Bearer} ${token}`});
        } catch (error) {
            return next(error);
        }
    }
}

// from login action:
// res.cookie(TOKENS.token, token, {
            //     httpOnly: true
            // });
            // res.status(200).json({message: "Login Successful", token: `Bearer ${token}`, active: (decoded as JwtPayload).active});