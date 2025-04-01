import { ParsedQs } from "qs";
import { MoviesRequestDTO } from "../DTOs/movies-dto";
import { IMovie } from "./IMovie";

export interface IMoviesService{
    getPopularMovies(): Promise<IMovie[] | null>;
    getNowPlayingMovies(): Promise<IMovie[] | null>;
    getMoviesByTitle(query: ParsedQs): Promise<IMovie[] | null>;
    getMoviesByYear(query: ParsedQs): Promise<IMovie[] | null>;
}