import redis from "../config/redis-client";
import { MoviesByGenre } from "../DTOs/genre-movie-dto";
import { IMovie } from "../interfaces/IMovie";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { TOKENS } from "../tokens";

export class MoviesRepository implements IMoviesRepository{
    async getMoviesByGenre(genre: string): Promise<IMovie[] | null> {
        const res =  await redis.get(genre);
        return res ? JSON.parse(res) : null;
    }
    async setMoviesByGenre(moviesByGenre: MoviesByGenre): Promise<void> {
        await redis.set(moviesByGenre.genre, JSON.stringify(moviesByGenre.movies), {EX: 30});
    }
    async getPopularMovies(): Promise<IMovie[] | null> {
        const res =  await redis.get(TOKENS.popularMovies);
        return res ? JSON.parse(res) : null;
    }
    async setPopularMovies(movies: IMovie[]): Promise<void> {
        await redis.set(TOKENS.popularMovies, JSON.stringify(movies), {EX: 30});
    }
    async getAllMovies(): Promise<IMovie[] | null> {
        const res =  await redis.get(TOKENS.allMovies);
        return res ? JSON.parse(res) : null;
    }
    async setAllMovies(movies: IMovie[]): Promise<void> {
        await redis.set(TOKENS.allMovies, JSON.stringify(movies), {EX: 30});;
    }
}