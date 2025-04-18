import axios from 'axios'
import { BadRequestError } from '@netflix-utils/shared'
import { API_READ_ACCESS_TOKEN } from "../config/env";
import { IMovie } from '../interfaces/IMovie';
import { IGenre } from '../interfaces/IGenre';
import { TOKENS } from '../tokens';

const apiReadAccessToken:string = API_READ_ACCESS_TOKEN!;

export const tmdbSearchMovies = async(title: string): Promise<IMovie[] | null> => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
        headers: {
        accept: 'application/json',
        Authorization: `${TOKENS.Bearer} ${apiReadAccessToken}`
        }
    };
    try {
        const res = await axios.request(options);
        const movies: IMovie[] = res.data.results
            .filter((movie: any) => movie.backdrop_path)
            .map((movie: any) => ({
                genre_ids: movie.genre_ids,
                id: movie.id,
                key: "",
                overview: movie.overview,
                popularity: movie.popularity,
                poster_path: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
                backdrop_path: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
                release_date: movie.release_date,
                title: movie.title,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count
            }));
        return movies;
    } catch (error) {
        throw new BadRequestError("Error in fetching movies");
    }
}

export const tmdbGetPopular = async (): Promise<IMovie[] | null> => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&sort_by=popularity.desc`,
        headers: {
        accept: 'application/json',
        Authorization: `${TOKENS.Bearer} ${apiReadAccessToken}`
        }
    };
    try{
        const res = await axios.request(options);
        const movies: IMovie[] = res.data.results.map((movie: any) => ({
            genre_ids: movie.genre_ids,
            id: movie.id,
            overview: movie.overview,
            popularity: movie.popularity,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            release_date: movie.release_date,
            title: movie.title,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count
        }));
        return movies;
    } catch (error) {
        throw new BadRequestError("Error in fetching movies");
    }
}

export const tmdbGetAllMovies = async(pages: number): Promise<IMovie[] | null> => {
    const allMovies: IMovie[] = [];
    
    for (let pageNum = 1; pageNum <= pages; pageNum++) {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${pageNum}&sort_by=popularity.desc`,
            headers: {
                accept: 'application/json',
                Authorization: `${TOKENS.Bearer} ${apiReadAccessToken}`
            }
        };
        
        try {
            const res = await axios.request(options);
            const movies: IMovie[] = res.data.results
                .filter((movie: any) => movie.backdrop_path)
                .map((movie: any) => ({
                    genre_ids: movie.genre_ids,
                    id: movie.id,
                    key: "",
                    overview: movie.overview,
                    popularity: movie.popularity,
                    poster_path: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
                    backdrop_path: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
                    release_date: movie.release_date,
                    title: movie.title,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count
                }));

            allMovies.push(...movies);
        } catch (error) {
            throw new BadRequestError("Error in fetching movies");
        }
    }
    return allMovies;
}

export const tmdbGetGenres = async(): Promise<IGenre[] | null> => {
        const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
        headers: {
        accept: 'application/json',
        Authorization: `${TOKENS.Bearer} ${apiReadAccessToken}`
        }
    };
    try{
        const res = await axios.request(options);
        const genres: IGenre[] = res.data.genres.map((genre: any) => ({
            id: genre.id,
            name: genre.name
        }));
        return genres;
    } catch (error) {
        throw new BadRequestError("Error in fetching movies");
    }
}

export const tmdbGetTrailer = async (movieId: number): Promise<string | null> => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        headers: {
        accept: 'application/json',
        Authorization: `${TOKENS.Bearer} ${apiReadAccessToken}`
        }
    };
    try{
        const res = await axios.request(options);
        const key = res.data.results.map((movieTrailer: any) => ({
            key: movieTrailer.key
        }));
        return key[0]?.key;
    } catch (error) {
        throw new BadRequestError("Error in fetching movies");
    }
}

// export const tmdbGetMoviesByGenre = async(): Promise<IMovie[] | null> => {
//     const options = {
//         method: 'GET',
//         url: `https://api.themoviedb.org/3/movie/popular?with_genres=28`,
//         headers: {
//         accept: 'application/json',
//         Authorization: `${TOKENS.Bearer} ${apiReadAccessToken}`
//         }
//     };
//     try{
//         const res = await axios.request(options);
//         const movies: IMovie[] = res.data.results.map((movie: any) => ({
//             genre_ids: movie.genre_ids,
//             id: movie.id,
//             overview: movie.overview,
//             popularity: movie.popularity,
//             poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//             release_date: movie.release_date,
//             title: movie.title,
//             vote_average: movie.vote_average,
//             vote_count: movie.vote_count
//         }));
//         return movies;
//     } catch (error) {
//         throw new BadRequestError("Error in fetching movies");
//     }
// }