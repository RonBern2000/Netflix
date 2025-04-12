import { injectable } from "inversify";
import { IUserLikeRepository } from "../interfaces/IUserLikeRepository";
import { AddRemoveRequest } from "../DTOs/add-remove";
import { UserLike } from "../models/user-like-sql-entity";

@injectable()
export class UserLikeRepository implements IUserLikeRepository{
    async add(addRemove: AddRemoveRequest): Promise<number[] | null> {
        const { userId, movieId } = addRemove;

        const userLike = await UserLike.findOne({ where: { id: userId } });
        if (!userLike) return null;

        const likedMovies = userLike.likedMovies || [];

        if (!likedMovies.includes(movieId)) {
            likedMovies.push(movieId);
            await UserLike.update(
                { likedMovies },
                { where: { id: userId } }
            );
        }
        return likedMovies;
    }
    async remove(addRemove: AddRemoveRequest): Promise<number[] | null> {
        const { userId, movieId } = addRemove;

        const userLike = await UserLike.findOne({ where: { id: userId } });
        if (!userLike) return null;

        const likedMovies = userLike.likedMovies || [];

        if (likedMovies.includes(movieId)) {
            const updatedMovies = likedMovies.filter(id => id !== movieId);
            await UserLike.update(
                { likedMovies: updatedMovies },
                { where: { id: userId } }
            );
            return updatedMovies;
        }
        return likedMovies;
    }
}