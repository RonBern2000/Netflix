import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { MoviesRequestDTO } from "../DTOs/movies-dto";
import { TOKENS } from "../tokens";
import { IMoviesService } from "../interfaces/IMoviesService";
import { json } from "sequelize";

@injectable()
export class MoviesController{
    constructor(@inject(TOKENS.IMoviesService) private moviesService: IMoviesService){}
    async GetMovies(req: Request, res: Response, next: NextFunction){
        try {
            const data: MoviesRequestDTO = req.body; // need change

            const token: string = await this.moviesService.movies(data); // need change

            res.cookie(TOKENS.Token, token, { // need change?
                httpOnly: true
            });
            res.status(200),json({message: "Movies load successfully", token});
        } catch (error) {
            return next(error);
        }
    }
}