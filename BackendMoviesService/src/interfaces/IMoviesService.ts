import { MoviesRequestDTO } from "../DTOs/movies-dto";
import { IMovie } from "./IMovie";

export interface IMoviesService{
    getPopularMovies(): Promise<IMovie[] | null>;
}