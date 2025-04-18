import { inject, injectable } from "inversify";
import { IMoviesService } from "../interfaces/IMoviesService";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { IMovie } from "../interfaces/IMovie";
import { tmdbGetAllMovies, tmdbGetGenres, tmdbGetPopular, tmdbSearchMovies } from "../utils/tmdb-api";
import { orderMoviesByGenre } from "../utils/orderMoviesByGenre";
import { MoviesByGenre } from "../DTOs/genre-movie-dto";
import { IGenre } from "../interfaces/IGenre";
import { setMoviesTrailer } from "../utils/setMoviesTrailer";
import { BadRequestError } from "@netflix-utils/shared";
//import redis from "../config/redis-client";

@injectable()
export class MoviesService implements IMoviesService{
    
    constructor(@inject(TOKENS.IMoviesRepository) private moviesRepository: IMoviesRepository) {}

    async searchByTitle(title: string): Promise<IMovie[] | null> {
        const movies = await tmdbSearchMovies(title);
        if(!movies)
            throw new BadRequestError('Failed to search movies.');
        return movies;
    }

    async getGenres(): Promise<IGenre[] | null> {
        const genres = await this.moviesRepository.getGeneres();
        if(!genres)
            throw new BadRequestError('Failed to load genres');
        return genres;
    }

    async getPopularMovies(): Promise<IMovie[] | null> {
        //await redis.del(TOKENS.popularMovies); // only for testing
        let popMovies : IMovie[] | null = await this.moviesRepository.getPopularMovies();
        if(!popMovies){
            popMovies = await tmdbGetPopular();
            await this.moviesRepository.setPopularMovies(popMovies!);
        }
        return popMovies ? popMovies.slice(0, 10) : null; // Top 10
    }


    async getAllMoviesByGenres(): Promise<Record<string, IMovie[]> | null> {
        // await redis.del(TOKENS.allMovies); // only for testing
        let allMovies : IMovie[] | null = await this.moviesRepository.getAllMovies();
        if(!allMovies){
            allMovies = await tmdbGetAllMovies(5);
            await setMoviesTrailer(allMovies);
            await this.moviesRepository.setAllMovies(allMovies!);
            const genres = await tmdbGetGenres();
            await this.moviesRepository.setGenres(genres!);
            const orderedByGenre: Record<string, IMovie[]> = await orderMoviesByGenre(allMovies!, genres!);
            Object.entries(orderedByGenre).forEach(async ([genre, movies]) => {
                const moviesByGenre: MoviesByGenre = {genre, movies};
                await this.moviesRepository.setMoviesByGenre(moviesByGenre);
            })
        }
        
        const allMoviesByGenres: Record<string, IMovie[]> = {}; 
        const genres: IGenre[] | null = await this.moviesRepository.getGeneres();
        if (genres) {
            for (const genre of genres) {
                const movies = await this.moviesRepository.getMoviesByGenre(genre.name);
                if (movies) {
                    allMoviesByGenres[genre.name] = movies;
                }
            }
        }
        return allMoviesByGenres;
    }
}

    // async getAllMovies(): Promise<IMovie[] | null> {
    //     const allMovies = await tmdbGetMoviesByGenre();
    //     console.log(allMovies);
    //     return allMovies;
        // await redis.del(TOKENS.allMovies); // only for testing
        // let allMovies : IMovie[] | null = await this.moviesRepository.getAllMovies();
        // // console.log('Is there redis:',allMovies);
        // if(!allMovies){
        //     allMovies = await tmdbGetAllMovies(5);
        //     if(allMovies){
        //         for (const movie of allMovies) {
        //             const key = await tmdbGetTrailer(movie.id);
        //             movie.key = key!;
        //         }
        //     }
        //     await this.moviesRepository.setAllMovies(allMovies!);
        //     const genres = await tmdbGetGenres();
        //     // await this.moviesRepository.setGenres(genres!);
        //     // const orderedByGenre: Record<string, IMovie[]> = await orderMoviesByGenre(allMovies!, genres!);
        //     // Object.entries(orderedByGenre).forEach(async ([genre, movies]) => {
        //     //     const moviesByGenre: MoviesByGenre = {genre, movies};
        //     //     await this.moviesRepository.setMoviesByGenre(moviesByGenre);
        //     // })
        //     // console.log('Ron the king:', allMovies);
        // }
        // console.log(allMovies?.length);
        // return allMovies;
//     }

    
// }
// async getMovieTrailer(movieId: number): Promise<string | null>{
//     const key = await tmdbGetTrailer(movieId);
//     return key;
// }

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

