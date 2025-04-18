import { IGenre } from "./IGenre";
import { IMovie } from "./IMovie";
export interface IMoviesService{
    searchByTitle(title: string): Promise<IMovie[] | null>;
    getPopularMovies(): Promise<IMovie[] | null>;
    getAllMoviesByGenres(): Promise<Record<string, IMovie[]> | null>;
    getGenres(): Promise<IGenre[] | null>;
}