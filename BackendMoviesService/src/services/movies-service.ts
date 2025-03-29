import { inject, injectable } from "inversify";
import { IMoviesService } from "../interfaces/IMoviesService";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { IMovie } from "../interfaces/IMovie";
import { tmdbGetPopular } from "../utils/tmdb-api";
import { BadRequestError } from "@netflix-utils/shared";
import redis from "../config/redis-client";

@injectable()
export class MoviesService implements IMoviesService{
    constructor(@inject(TOKENS.IMoviesRepository) private moviesRepository: IMoviesRepository) {
        
    }
    // async getPopularMovies(): Promise<IMovie[] | null> {
    //     let data: string | null = await redis.get(TOKENS.popularMovies);
    //     let popMovies:IMovie[] | null = data ? JSON.parse(data) : null;
    //     console.log('Movies came from redis:',popMovies);
    //     if(!popMovies){
    //         popMovies = await tmdbGetPopular();
    //         await redis.set(TOKENS.popularMovies, JSON.stringify(popMovies));
    //         console.log('Movies came from db:', popMovies);
    //     }
    //     return popMovies ? popMovies.slice(0, 10) : null; // Top 10
    // }
    async getPopularMovies(): Promise<IMovie[] | null> {
         // await redis.del(TOKENS.popularMovies);
        // let data: string | null = await redis.get(TOKENS.popularMovies);
        // console.log('Is there data:',data);
        // let popMovies:IMovie[] | null = data ? JSON.parse(data) : null;
        let popMovies : IMovie[] | null = await this.moviesRepository.getPopularMovies();
        console.log('Is there redis:',popMovies);
        if(!popMovies){
            popMovies = await tmdbGetPopular();
            await this.moviesRepository.setPopularMovies(popMovies!);
            console.log('Ron the king:', popMovies);
        }
        return popMovies ? popMovies.slice(0, 10) : null; // Top 10
    }
}

