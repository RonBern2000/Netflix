import { inject, injectable } from "inversify";
import { IUserToMovieService } from "../interfaces/IUserToMovieService";
import { TOKENS } from "../tokens";
import { NextFunction, Request, Response} from "express";

@injectable()
export class UserToMovieController{
    constructor(@inject(TOKENS.IUserToMovieService) private userToMovieService: IUserToMovieService){}

    async getRecommendations(req: Request, res: Response, next: NextFunction){
        try {
            
        } catch (error) {
            
        }
    }
}