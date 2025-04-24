import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserToMovieService } from "../interfaces/IUserToMovieService";
import { IUserToMovieRepository } from "../interfaces/IUserToMovieRepository";
import { IMovie } from "../interfaces/IMovie";
import { AIService } from "../utils/ai-service";
import redis from "../config/redis-client";

@injectable()
export class UserToMovieService implements IUserToMovieService{

    private aiService = new AIService();

    constructor(@inject(TOKENS.IUserToMovieRepository) private userToMovieRepository: IUserToMovieRepository) {}

    async getReccomendations(userId: string): Promise<IMovie[] | null> {
        //TODO: here we do the logic where we first get all the movies from the redis, then all the data for the relevent user and make the Prompt to the AI and at the end we process the response and ideally return an array of recommended movies(IMovie[]). 
        throw new Error("Method not implemented.");
    }
}