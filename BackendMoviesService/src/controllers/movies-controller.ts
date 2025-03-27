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
    async getMovies(req: Request, res: Response, next: NextFunction){
        try {
            const data: MoviesRequestDTO = req.body; // need change

            const movies: IMovie[] | IMovie | null = await this.moviesService.movies(data); // need change

            res.status(200),json({message: "Movies load successfully", movies});
        } catch (error) {
            return next(error);
        }
    }
}