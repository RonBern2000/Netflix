import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IMoviesService } from "../interfaces/IMoviesService";
import { IMovie } from "../interfaces/IMovie";
// import { getMovieIdParam } from "../utils/getMovieIdParam";

@injectable()
export class MoviesController{
    constructor(@inject(TOKENS.IMoviesService) private moviesService: IMoviesService){}
    async getPopularMovies(req: Request, res: Response, next: NextFunction){
        try {
            const popularMovies: IMovie[] | null = await this.moviesService.getPopularMovies();
            return res.status(200).json({popularMovies});
        } catch (error) {
            return next(error);
        }
    }

    async getAllMoviesByGenres(req: Request, res: Response, next: NextFunction) {
        try {
            const allMoviesByGenres: Record<string, IMovie[]> | null = await this.moviesService.getAllMoviesByGenres();
            return res.status(200).json({allMoviesByGenres});
        } catch (error) {
            return next(error);
        }
    }

    async getGenres(req: Request, res: Response, next: NextFunction){
        try {
            const genres = await this.moviesService.getGenres();
            if(!genres){
                return res.status(500).json({message: 'Error'});
            }
            return res.status(200).json({genres});
        } catch (error) {
            return next(error);
        }
    }

    async getAllMovies(req: Request, res: Response, next: NextFunction){
        try {
            const allMovies: IMovie[] | null = await this.moviesService.getAllMovies();
            return res.status(200).json({allMovies});
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