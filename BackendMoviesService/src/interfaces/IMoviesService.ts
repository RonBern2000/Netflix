import { IMovie } from "./IMovie";

export interface IMoviesService{
    getPopularMovies(): Promise<IMovie[] | null>;
    getAllMovies(): Promise<IMovie[] | null>;
}