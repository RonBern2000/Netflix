import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { MoviesRequestDTO } from "../DTOs/movies-dto";
import { TOKENS } from "../tokens";
import { IMoviesService } from "../interfaces/IMoviesService";
import { json } from "sequelize";
import { IMovie } from "../interfaces/IMovie";

@injectable()
export class MoviesController{
    constructor(@inject(TOKENS.IMoviesService) private moviesService: IMoviesService){}
    async getPopularMovies(req: Request, res: Response, next: NextFunction){
        try {
            const popularMovies: IMovie[] | null = await this.moviesService.getPopularMovies();
            res.status(200),json({message: "Movies load successfully", popularMovies});
        } catch (error) {
            return next(error);
        }
    }
}