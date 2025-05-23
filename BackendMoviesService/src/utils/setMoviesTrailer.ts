import { IMovie } from "../interfaces/IMovie";
import { tmdbGetTrailer } from "./tmdb-api";

export const setMoviesTrailer = async (allMovies: IMovie[] | null) =>{
    if(allMovies){ 
        for (const movie of allMovies) {
            const key = await tmdbGetTrailer(movie.id);
            movie.key = key ? key : '';
        }
    }
}