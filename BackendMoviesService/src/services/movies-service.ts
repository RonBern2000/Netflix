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
        let genres = await this.moviesRepository.getGeneres();
        if(!genres)
            genres = await tmdbGetGenres();
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
            console.log("Movie with trailer: ", allMovies ? allMovies[0]: 'none');
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