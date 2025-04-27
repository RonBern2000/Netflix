import { IMovie } from "./IMovie";

export interface IUserToMovieService{
    getRecommendations(userId: string): Promise<IMovie[] | null>;
}