import { inject, injectable } from "inversify";
import { IMoviesService } from "../interfaces/IMoviesService";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { IMovie } from "../interfaces/IMovie";
import { mapFromArrayToRecord, tmdbGetAllMovies, tmdbGetGenres, tmdbGetPopular, tmdbSearchMovies } from "../utils/tmdb-api";
import { orderMoviesByGenre } from "../utils/orderMoviesByGenre";
import { MoviesByGenre } from "../DTOs/genre-movie-dto";
import { IGenre } from "../interfaces/IGenre";
import { setMoviesTrailer } from "../utils/setMoviesTrailer";
import { BadRequestError } from "@netflix-utils/shared";
import { NODE_ENV } from "../config/env";
//import redis from "../config/redis-client";

@injectable()
export class MoviesService implements IMoviesService{
    
    constructor(@inject(TOKENS.IMoviesRepository) private moviesRepository: IMoviesRepository) {}

    async searchByTitle(title: string): Promise<Record<number, IMovie>> {
        const movies = await tmdbSearchMovies(title);
        if(!movies)
            throw new BadRequestError('Failed to search movies.');
        const moviesRecord = mapFromArrayToRecord(movies);
        return moviesRecord;
    }

    async getGenres(): Promise<IGenre[] | null> {
        let genres = null;
        if(NODE_ENV !== 'test')
            genres = await this.moviesRepository.getGeneres();
        else
            genres = await tmdbGetGenres();
        if(!genres)
            throw new BadRequestError('Failed to load genres');
        return genres;
    }

    async getPopularMovies(): Promise<IMovie[] | null> {
        //await redis.del(TOKENS.popularMovies); // only for testing
        let popMovies : IMovie[] | null = null;
        if(NODE_ENV !== 'test')
            popMovies = await this.moviesRepository.getPopularMovies();
        if(!popMovies){
            popMovies = await tmdbGetPopular();
            if(NODE_ENV !== 'test')
                await this.moviesRepository.setPopularMovies(popMovies!);
        }
        return popMovies ? popMovies.slice(0, 10) : null; // Top 10
    }


    async getAllMoviesByGenres(): Promise<Record<string, IMovie[]> | null> {
        // await redis.del(TOKENS.allMovies); // only for testing
        let allMovies : IMovie[] | null = null;
        if(NODE_ENV !== 'test')
            allMovies = await this.moviesRepository.getAllMovies();
        if(!allMovies){
            allMovies = await tmdbGetAllMovies(5);
            await setMoviesTrailer(allMovies);
            console.log("Movie with trailer: ", allMovies ? allMovies[0]: 'none'); // can delete?
            if(NODE_ENV !== 'test')
                await this.moviesRepository.setAllMovies(allMovies!);
            const genres = await tmdbGetGenres();
            if(NODE_ENV !== 'test')
                await this.moviesRepository.setGenres(genres!);
            const orderedByGenre: Record<string, IMovie[]> = await orderMoviesByGenre(allMovies!, genres!);
            if(NODE_ENV === 'test')
                return orderedByGenre;
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