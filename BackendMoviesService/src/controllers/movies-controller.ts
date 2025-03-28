import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IMoviesService } from "../interfaces/IMoviesService";
import { IMovie } from "../interfaces/IMovie";

@injectable()
export class MoviesController{
    constructor(@inject(TOKENS.IMoviesService) private moviesService: IMoviesService){}
    async getPopularMovies(req: Request, res: Response, next: NextFunction){
        try {
            const popularMovies: IMovie[] | null = await this.moviesService.getPopularMovies();
            res.status(200).json({message: "Popular Movies loaded successfully", popularMovies});
        } catch (error) {
            return next(error);
        }
    }
}