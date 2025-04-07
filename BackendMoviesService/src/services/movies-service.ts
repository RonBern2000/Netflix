import { inject, injectable } from "inversify";
import { IMoviesService } from "../interfaces/IMoviesService";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { IMovie } from "../interfaces/IMovie";
import { tmdbGetAllMovies, tmdbGetPopular, tmdbGetTrailer } from "../utils/tmdb-api";
import redis from "../config/redis-client";
@injectable()
export class MoviesService implements IMoviesService{
    constructor(@inject(TOKENS.IMoviesRepository) private moviesRepository: IMoviesRepository) {}

    async getAllMovies(): Promise<IMovie[] | null> {
        await redis.del(TOKENS.allMovies); // only for testing
        let allMovies : IMovie[] | null = await this.moviesRepository.getAllMovies();
        console.log('Is there redis:',allMovies);
        if(!allMovies){
            allMovies = await tmdbGetAllMovies(5);
            if(allMovies){
                for (const movie of allMovies) {
                    const key = await tmdbGetTrailer(movie.id);
                    movie.key = key!;
                }
            }
            await this.moviesRepository.setAllMovies(allMovies!);
            console.log('Ron the king:', allMovies);
        }
        console.log(allMovies?.length);
        return allMovies;
    }

    async getPopularMovies(): Promise<IMovie[] | null> {
        await redis.del(TOKENS.popularMovies); // only for testing
        let popMovies : IMovie[] | null = await this.moviesRepository.getPopularMovies();
        console.log('Is there redis:',popMovies);
        if(!popMovies){
            popMovies = await tmdbGetPopular();
            await this.moviesRepository.setPopularMovies(popMovies!);
            console.log('Ron the king:', popMovies);
        }
        return popMovies ? popMovies.slice(0, 10) : null; // Top 10
    }

    async getMovieTrailer(movieId: number): Promise<string | null>{
        const key = await tmdbGetTrailer(movieId);
        return key;
    }
}

 // await redis.del(TOKENS.popularMovies);
        // let data: string | null = await redis.get(TOKENS.popularMovies);
        // console.log('Is there data:',data);
        // let popMovies:IMovie[] | null = data ? JSON.parse(data) : null;



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

