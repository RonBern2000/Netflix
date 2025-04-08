import { IMovie } from "../interfaces/IMovie";

export interface MoviesByGenre{
    genre: string;
    movies: IMovie[];
}