import { inject, injectable } from "inversify";
import { IUserLikeService } from "../interfaces/IUserLikeService";
import { TOKENS } from "../tokens";
import { IUserLikeRepository } from "../interfaces/IUserLikeRepository";
import { AddRemoveRequest } from "../DTOs/add-remove";
import { BadRequestError, Exchanges } from "@netflix-utils/shared";
import { IMovie } from "../interfaces/IMovie";
import { rabbit } from "../config/rabbit";

@injectable()
export class UserLikeService implements IUserLikeService{
    constructor(@inject(TOKENS.IUserLikeRepository) private userLikeRepository: IUserLikeRepository){}

    async getMyList(userId: string): Promise<Record<number, IMovie> | null> {
        const myList = await this.userLikeRepository.getMyList(userId);
        if(!myList){
            throw new BadRequestError('Failed getting myList...');
        }
        return myList;
    }
    async add(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null> {
        const updatedLikedMovies = await this.userLikeRepository.add(addRemove);
        if(!updatedLikedMovies){
            throw new BadRequestError('Adding movie to liked failed...');
        }
        await rabbit.publishMessage(Exchanges.UserToMovie, 'add' ,{ userId: addRemove.userId, movieId: addRemove.movieId });
        return updatedLikedMovies;
    }
    async remove(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null> {
        const updatedLikedMovies = await this.userLikeRepository.remove(addRemove);
        if(!updatedLikedMovies){
            throw new BadRequestError('Removing movie from liked failed...');
        }
        await rabbit.publishMessage(Exchanges.UserToMovie, 'remove' ,{ userId: addRemove.userId, movieId: addRemove.movieId });
        return updatedLikedMovies;
    }
}