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
            res.status(200).json({popularMovies});
        } catch (error) {
            return next(error);
        }
    }

    async getAllMovies(req: Request, res: Response, next: NextFunction){
        try {
            const allMovies: IMovie[] | null = await this.moviesService.getAllMovies();
            res.status(200).json({allMovies});
        } catch (error) {
            return next(error);
        }
    }

    async getMovieTrailer(req: Request, res: Response, next: NextFunction){
        const { movieId } = req.params;
        const parsedId = Number(movieId); // TODO: make it a middleware/utils not here inside a controller
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: "Invalid movie ID" });
        }
        try {
            const key: string | null = await this.moviesService.getMovieTrailer(parsedId);
            res.status(200).json(key);
        } catch (error) {
            return next(error);
        }
    }
}