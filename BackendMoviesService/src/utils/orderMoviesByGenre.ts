import { IGenre } from "../interfaces/IGenre";
import { IMovie } from "../interfaces/IMovie";

export const orderMoviesByGenre = async(allMovies: IMovie[], genres: IGenre[]): Promise<Record<string, IMovie[]>> => {
    const genresDict: { [key: number]: string } = {}; // TODO move to redis or take from redis
    const orderedByGenre: Record<string, IMovie[]> = {};

    for (const genre of genres)
        genresDict[genre.id] = genre.name;

    for (const movie of allMovies)
    {
        movie.genre_ids.forEach((genreId) => {
            if(!orderedByGenre[genresDict[genreId]])
                orderedByGenre[genresDict[genreId]] = [];
            
            orderedByGenre[genresDict[genreId]].push(movie);
        })
    }
    return orderedByGenre;
}