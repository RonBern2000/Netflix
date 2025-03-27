import { MoviesRequestDTO } from "../DTOs/movies-dto";

export interface IMoviesService{
    movies(data: MoviesRequestDTO): Promise<string>;
}