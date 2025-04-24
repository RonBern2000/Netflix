import { UserToMovieDTO } from "../DTO/user-to-movie-dto";
import { IUserToMovie } from "../interfaces/IUserToMovie";
import { IUserToMovieRepository } from "../interfaces/IUserToMovieRepository";
import UserToMovie from "../models/user-to-movie-entity";

export class UserToMovieRepository implements IUserToMovieRepository{

    async getUserToMovies(userId: string): Promise<IUserToMovie[] | []> {
        return await UserToMovie.find({ userId });
    }

    async create(userToMovie: UserToMovieDTO): Promise<IUserToMovie | null> {
        const doc = UserToMovie.build(userToMovie);
        const saved = await doc.save();
        return saved.toJSON() as IUserToMovie;
    }

    async remove(userToMovie: UserToMovieDTO): Promise<void> {
        await UserToMovie.deleteOne({
            userId: userToMovie.userId,
            movieId: userToMovie.movieId
        });
    }
}