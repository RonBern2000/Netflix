import { MoviesByGenre } from "../DTOs/genre-movie-dto";
import { IGenre } from "./IGenre";
import { IMovie } from "./IMovie";

export interface IMoviesRepository{
    getPopularMovies(): Promise<IMovie[] | null>;
    setPopularMovies(movies: IMovie[]): Promise<void>;
    getAllMovies(): Promise<IMovie[] | null>;
    setAllMovies(movies: IMovie[]): Promise<void>;
    getMoviesByGenre(genre: string): Promise<IMovie[] | null>;
    setMoviesByGenre(moviesByGenre: MoviesByGenre): Promise<void>;
    getGeneres(): Promise<IGenre[] | null>;
    setGenres(genres: IGenre[]): Promise<void>;
}