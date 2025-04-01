import redis from "../config/redis-client";
import { IMovie } from "../interfaces/IMovie";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { TOKENS } from "../tokens";

export class MoviesRepository implements IMoviesRepository{
    async getPopularMovies(): Promise<IMovie[] | null> {
        const res =  await redis.get(TOKENS.popularMovies);
        return res ? JSON.parse(res) : null;
    }
    async getNowPlayingMovies(): Promise<IMovie[] | null> {
        const res =  await redis.get(TOKENS.nowPlayingMovies);
        return res ? JSON.parse(res) : null;    
    }
    async getMoviesByQuery(query: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async getMoviesByTitle(query: string): Promise<IMovie[] | null> {
        throw new Error("Method not implemented.");
    }
    async getMoviesByYear(query: string): Promise<IMovie[] | null> {
        throw new Error("Method not implemented.");
    }
    async setMoviesByTitle(movies: IMovie[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async setMoviesByYear(movies: IMovie[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async setPopularMovies(movies: IMovie[]): Promise<void> {
        await redis.set(TOKENS.popularMovies, JSON.stringify(movies), {EX: 30});
    }
    async setNowPlayingMovies(movies: IMovie[]): Promise<void> {
        await redis.set(TOKENS.nowPlayingMovies, JSON.stringify(movies), {EX: 30});
    }
    async setAllMovies(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}