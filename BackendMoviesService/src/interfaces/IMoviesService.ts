import { MoviesRequestDTO } from "../DTOs/movies-dto";
import { IMovie } from "./IMovie";

export interface IMoviesService{
    movies(data: MoviesRequestDTO): Promise<IMovie | IMovie[] | null>
}