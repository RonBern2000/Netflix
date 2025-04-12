import { inject, injectable } from "inversify";
import { IUserLikeService } from "../interfaces/IUserLikeService";
import { TOKENS } from "../tokens";
import { IUserLikeRepository } from "../interfaces/IUserLikeRepository";
import { AddRemoveRequest } from "../DTOs/add-remove";
import { BadRequestError } from "@netflix-utils/shared";

@injectable()
export class UserLikeService implements IUserLikeService{
    constructor(@inject(TOKENS.IUserLikeRepository) private userLikeRepository: IUserLikeRepository){
        
    }
    async add(addRemove: AddRemoveRequest): Promise<number[] | null> {
        const updatedLikedMovies = await this.userLikeRepository.add(addRemove);
        if(!updatedLikedMovies){
            throw new BadRequestError('Adding movie to liked failed...');
        }
        return updatedLikedMovies;
    }
    async remove(addRemove: AddRemoveRequest): Promise<number[] | null> {
        const updatedLikedMovies = await this.userLikeRepository.remove(addRemove);
        if(!updatedLikedMovies){
            throw new BadRequestError('Removing movie from liked failed...');
        }
        return updatedLikedMovies;
    }
}