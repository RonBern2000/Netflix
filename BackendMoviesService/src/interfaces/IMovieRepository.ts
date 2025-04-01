import { IMovie } from "./IMovie";

export interface IMoviesRepository{
    getPopularMovies(): Promise<IMovie[] | null>;
    getNowPlayingMovies(): Promise<IMovie[] | null>;
    getMoviesByTitle(query: string): Promise<IMovie[] | null>;
    getMoviesByYear(query: string): Promise<IMovie[] | null>;
    setMoviesByTitle(movies: IMovie[]): Promise<void>;
    setMoviesByYear(movies: IMovie[]): Promise<void>;
    setPopularMovies(movies: IMovie[]): Promise<void>;
    setNowPlayingMovies(movies: IMovie[]): Promise<void>;
    setAllMovies(): Promise<void>
}