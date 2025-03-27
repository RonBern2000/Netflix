import { IMovie } from "./IMovie";

export interface IMoviesRepository{
    findMoviesByEmail(name: string): Promise<IMovie | null>;
    findMoviesByGanre(ganre: string): Promise<IMovie[] | null>;
}