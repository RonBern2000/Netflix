import { inject, injectable } from "inversify";
import { TOKENS } from "../tokens";
import { IUserToMovieService } from "../interfaces/IUserToMovieService";
import { IUserToMovieRepository } from "../interfaces/IUserToMovieRepository";
import { IMovie } from "../interfaces/IMovie";
import redis from "../config/redis-client";
import { IAIService } from "../interfaces/IAIService";
import { BadRequestError } from "@netflix-utils/shared";
import { IMovieForPrompt } from "../interfaces/IMovieForPrompt";
@injectable()
export class UserToMovieService implements IUserToMovieService{

    constructor(
        @inject(TOKENS.IUserToMovieRepository) private userToMovieRepository: IUserToMovieRepository,
        @inject(TOKENS.IAIService) private aiService: IAIService) {}

    async getRecommendations(userId: string): Promise<IMovie[] | null> {
        const moviesDbString = await redis.get(TOKENS.allMovies);
        if(!moviesDbString){
            throw new BadRequestError('redis is empty');
        }
        const moviesDbFull: IMovie[] = JSON.parse(moviesDbString); 
        const moviesDb: IMovieForPrompt[] = moviesDbFull.map(movie => ({ // IMovieForPrompt { id(number), genreIds[], release_date }
            id: movie.id,
            genre_ids: movie.genre_ids,
            release_date: movie.release_date
        }));
        const movieStrings = this.fromObjectArrayToStringArray(moviesDb);

        console.log("MovieStrings: ",movieStrings, "Amount: ", movieStrings.length);

        const userMyListMoviesWithNotNeededProps = await this.userToMovieRepository.getUserToMovies(userId); // can be length 0 array
        const userMyListMovies: number[] = userMyListMoviesWithNotNeededProps.map(m => m.movieId); 
        const userMyListMoviesStrings = this.fromObjectArrayToStringArray(userMyListMovies);

        console.log("userMyListMoviesStrings: ",userMyListMoviesStrings, "Amount: ", userMyListMoviesStrings.length);

        const recommendationString: string = await this.aiService.getMovieRecommendationsPrompt(movieStrings, userMyListMoviesStrings); // strings of ids of recommend movies 45,21,2,65...  

        console.log("Recommened listString: ", recommendationString);
        // Answer Processing
        return null;
    }

    private fromObjectArrayToStringArray<T>(array: T[]): string[] {
        const stringArray = array.map(item => JSON.stringify(item));
        return stringArray;
    }
}