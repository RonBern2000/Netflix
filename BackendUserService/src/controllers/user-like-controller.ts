import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserLikeService } from "../interfaces/IUserLikeService";
import { NextFunction, Response, Request } from "express";
import { AddRemoveRequest } from "../DTOs/add-remove";


@injectable()
export class UserLikeController{
    constructor(@inject(TOKENS.IUserLikeService) private userLikeService: IUserLikeService){}

    async add(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.headers['x-user-id']; // from the prxoy
            const { movieId } = req.body;
            let likedMovies: number[] | null = null;
            if(typeof userId !== 'string'){
                res.status(400).json({message: 'Adding a movie to the liked list failed...'});
            }
            likedMovies = await this.userLikeService.add({userId, movieId} as AddRemoveRequest);
            if(!likedMovies){
                res.status(400).json({message: 'Adding a movie to the liked list failed...'});
            }
            
            res.status(201).json({likedMovies});
        } catch (error) {
            return next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.headers['x-user-id']; // from the prxoy
            const { movieId } = req.body;
            let likedMovies: number[] | null = null;
            if(typeof userId !== 'string'){
                res.status(400).json({message: 'Removing a movie to the liked list failed...'});
            }
            likedMovies = await this.userLikeService.remove({userId, movieId} as AddRemoveRequest);
            if(!likedMovies){
                res.status(400).json({message: 'Removing a movie to the liked list failed...'});
            }
                    
            res.status(200).json({likedMovies});
        } catch (error) {
            return next(error);
        }
    }
}