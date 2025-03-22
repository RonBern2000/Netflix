import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { LoginRequestDTO } from "../DTOs/login-dto";
import { TOKENS } from "../tokens";
import { IUserService } from "../interfaces/IUserService";
import { json } from "sequelize";
import { generateCustomError } from "../middleware/error-handler";
import { SignupRequestDTO } from "../DTOs/signup-dto";

@injectable()
export class UserController{
    constructor(@inject(TOKENS.IUserService) private userService: IUserService){}

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const data: LoginRequestDTO = req.body;

            const token: string = await this.userService.login(data);

            res.cookie(TOKENS.Token, token, {
                httpOnly: true 
            });
            res.status(200),json({message: "Login Successful", token});
        } catch (error) {
            return next(generateCustomError(error, 401));
        }
    }
    async signup(req: Request, res: Response, next: NextFunction){
        try {
            const data: SignupRequestDTO = req.body;

            const token: string = await this.userService.signup(data);
        } catch (error) {
            
        }
    }
}