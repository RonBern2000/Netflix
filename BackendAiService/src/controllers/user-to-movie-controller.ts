import { inject, injectable } from "inversify";
import { IUserToMovieService } from "../interfaces/IUserToMovieService";
import { TOKENS } from "../tokens";
import { NextFunction, Request, Response} from "express";
import { IMovie } from "../interfaces/IMovie";

@injectable()
export class UserToMovieController{
    constructor(@inject(TOKENS.IUserToMovieService) private userToMovieService: IUserToMovieService){}

    async getRecommendations(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.headers['x-user-id'];
            let recommendedMovies: IMovie[] | null = null;
            if(typeof userId === 'string'){
                recommendedMovies = await this.userToMovieService.getRecommendations(userId);
            }
            return res.status(200).json({recommendedMovies});
        } catch (error) {
            return next(error);
        }
    }
}