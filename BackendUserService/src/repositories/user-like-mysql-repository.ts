import { injectable } from "inversify";
import { IUserLikeRepository } from "../interfaces/IUserLikeRepository";
import { AddRemoveRequest } from "../DTOs/add-remove";
import { UserToMovie } from "../models/user-like-sql-entity";
import { IMovie } from "../interfaces/IMovie";

@injectable()
export class UserLikeRepository implements IUserLikeRepository{
    async add(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null> {
        const isAlreadyLiked = await UserToMovie.findOne({
            where: {
                userId: addRemove.userId,
                movieId: addRemove.movieId,
            },
        });
        if(!isAlreadyLiked){
            await UserToMovie.create({ ...addRemove });
        }
            
        const userToMovies = await UserToMovie.findAll({
            where: { userId: addRemove.userId },
            attributes: [
                "movieId",
                "genre_ids",
                "key",
                "overview",
                "popularity",
                "poster_path",
                "backdrop_path",
                "release_date",
                "title",
                "vote_average",
                "vote_count",
            ],
            raw: true,
        });
        return this.mapFromEntityToIMovie(userToMovies);
    }
    
    async remove(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null> {
        await UserToMovie.destroy({
            where: {
                userId: addRemove.userId,
                movieId: addRemove.movieId,
            },
        });

        const userToMovies = await UserToMovie.findAll({
            where: { userId: addRemove.userId },
            attributes: [
                "movieId",
                "genre_ids",
                "key",
                "overview",
                "popularity",
                "poster_path",
                "backdrop_path",
                "release_date",
                "title",
                "vote_average",
                "vote_count",
            ],
            raw: true,
        });
        return this.mapFromEntityToIMovie(userToMovies);
    }

    private mapFromEntityToIMovie(movies: UserToMovie[]): Record<number, IMovie> {
        return movies.reduce((acc, movie) => {
            acc[movie.movieId] = {
                id: movie.movieId,
                genre_ids: movie.genre_ids,
                key: movie.key,
                overview: movie.overview,
                popularity: movie.popularity,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                release_date: movie.release_date,
                title: movie.title,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
            };
            return acc;
        }, {} as Record<number, IMovie>);
    }
}