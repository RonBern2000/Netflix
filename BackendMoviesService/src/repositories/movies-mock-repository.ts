import { MoviesByGenre } from "../DTOs/genre-movie-dto";
import { IGenre } from "../interfaces/IGenre";
import { IMovie } from "../interfaces/IMovie";
import { IMoviesRepository } from "../interfaces/IMovieRepository";

export class MoviesMockRepository implements IMoviesRepository{
    async getPopularMovies(): Promise<IMovie[] | null> {
        return null;
    }
    async setPopularMovies(movies: IMovie[]): Promise<void> {}
    async getAllMovies(): Promise<IMovie[] | null> {
        return null;
    }
    async setAllMovies(movies: IMovie[]): Promise<void> {}
    async getMoviesByGenre(genre: string): Promise<IMovie[] | null> {
        return null;
    }
    async setMoviesByGenre(moviesByGenre: MoviesByGenre): Promise<void> {}
    async getGeneres(): Promise<IGenre[] | null> {
        return null;
    }
    async setGenres(genres: IGenre[]): Promise<void> {}
}