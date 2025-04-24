import { IMovie } from "./IMovie";

export interface IUserToMovieService{
    getReccomendations(userId: string): Promise<IMovie[] | null>;
}