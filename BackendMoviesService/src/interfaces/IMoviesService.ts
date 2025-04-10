import { IGenre } from "./IGenre";
import { IMovie } from "./IMovie";

export interface IMoviesService{
    getPopularMovies(): Promise<IMovie[] | null>;
    getAllMovies(): Promise<IMovie[] | null>;
    getAllMoviesByGenres(): Promise<Record<string, IMovie[]> | null>;
    getGenres(): Promise<IGenre[] | null>;
    // getMovieTrailer(movieId: number): Promise<string | null>
}