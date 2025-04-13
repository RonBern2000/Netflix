import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserLikeService } from "../interfaces/IUserLikeService";
import { NextFunction, Response, Request } from "express";
import { AddRemoveRequest } from "../DTOs/add-remove";
import { IMovie } from "../interfaces/IMovie";


@injectable()
export class UserLikeController{
    constructor(@inject(TOKENS.IUserLikeService) private userLikeService: IUserLikeService){}

    async add(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.headers['x-user-id']; // from the prxoy
            const { movie } = req.body;
            if(typeof userId !== 'string' || !userId){
                return res.status(400).json({message: 'Adding a movie to the liked list failed...'});
            }
            const addRequest: AddRemoveRequest = {
                userId,
                movieId: movie.id,
                genre_ids: movie.genre_ids || [],
                key: movie.key || '',
                overview: movie.overview || '',
                popularity: movie.popularity || 0,
                poster_path: movie.poster_path || '',
                backdrop_path: movie.backdrop_path || '',
                release_date: movie.release_date || '',
                title: movie.title || '',
                vote_average: movie.vote_average || 0,
                vote_count: movie.vote_count || 0,
            };
            const likedMovies = await this.userLikeService.add(addRequest);
            if(!likedMovies){
                return res.status(400).json({message: 'Adding a movie to the liked list failed...'});
            }
            
            return res.status(201).json({likedMovies});
        } catch (error) {
            return next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.headers['x-user-id']; // from the prxoy
            const { movie } = req.body;
            if(typeof userId !== 'string'){
                return res.status(400).json({message: 'Removing a movie to the liked list failed...'});
            }
            const addRequest: AddRemoveRequest = {
                userId,
                movieId: movie.id,
                genre_ids: movie.genre_ids || [],
                key: movie.key || '',
                overview: movie.overview || '',
                popularity: movie.popularity || 0,
                poster_path: movie.poster_path || '',
                backdrop_path: movie.backdrop_path || '',
                release_date: movie.release_date || '',
                title: movie.title || '',
                vote_average: movie.vote_average || 0,
                vote_count: movie.vote_count || 0,
            };
            const likedMovies = await this.userLikeService.remove(addRequest);
            if(!likedMovies){
                return res.status(400).json({message: 'Removing a movie to the liked list failed...'});
            }
                    
            return res.status(200).json({likedMovies});
        } catch (error) {
            return next(error);
        }
    }
}