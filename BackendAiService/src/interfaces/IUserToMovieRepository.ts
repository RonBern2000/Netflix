import { UserToMovieDTO } from "../DTO/user-to-movie-dto";
import { IUserToMovie } from "./IUserToMovie";

export interface IUserToMovieRepository{
    getUserToMovies(userId: string): Promise<IUserToMovie[] | []>;
    create(userToMovie: UserToMovieDTO): Promise<IUserToMovie | null>;
    remove(userToMovie: UserToMovieDTO): Promise<void>;
}