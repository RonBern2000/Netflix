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

    // TODO: getAllMovies action
    async getNowPlayingMovies(req: Request, res: Response, next: NextFunction){
        try {
            const nowPlayingMovies: IMovie[] | null = await this.moviesService.getNowPlayingMovies();
            res.status(200).json({nowPlayingMovies});
        } catch (error) {
            return next(error);
        }
    }
    async getMoviesByTitle(req: Request, res: Response, next: NextFunction){
        try {
            const moviesByTitle: IMovie[] | null = await this.moviesService.getMoviesByTitle(req.query);
            res.status(200).json({moviesByTitle});
        } catch (error) {
            return next(error);
        }
    }
    async getMoviesByYear(req: Request, res: Response, next: NextFunction){
        try {
            const moviesByYear: IMovie[] | null = await this.moviesService.getMoviesByYear(req.query);
            res.status(200).json({moviesByYear});
        } catch (error) {
            return next(error);
        }
    }
}