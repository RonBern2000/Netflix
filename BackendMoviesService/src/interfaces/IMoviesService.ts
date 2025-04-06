import { IMovie } from "./IMovie";

export interface IMoviesService{
    getPopularMovies(): Promise<IMovie[] | null>;
    getAllMovies(): Promise<IMovie[] | null>;
    getMovieTrailer(movieId: number): Promise<string | null>
}