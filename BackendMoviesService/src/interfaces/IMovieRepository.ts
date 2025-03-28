import { IMovie } from "./IMovie";

export interface IMoviesRepository{
    getPopularMovies(): Promise<IMovie[] | null>;
    getMoviesByQuery(query: string):Promise<string | null>;
    setPopularMovies(movies: IMovie[]): Promise<void>;
    setAllMovies(): Promise<void>
}