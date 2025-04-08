import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IMoviesService } from "../interfaces/IMoviesService";
import { IMovie } from "../interfaces/IMovie";
import { getMovieIdParam } from "../utils/getMovieIdParam";

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

    async getAllMoviesByGenres(req: Request, res: Response, next: NextFunction) {
        try {
            const allMoviesByGenres: Record<string, IMovie[]> | null = await this.moviesService.getAllMoviesByGenres();
            res.status(200).json({allMoviesByGenres});
        } catch (error) {
            return next(error);
        }
    }

}
// async getMovieTrailer(req: Request, res: Response, next: NextFunction){
//     try {
//         const movieId = getMovieIdParam(req);
//         const key: string | null = await this.moviesService.getMovieTrailer(movieId);
//         res.status(200).json(key);
//     } catch (error) {
//         return next(error);
//     }
// }