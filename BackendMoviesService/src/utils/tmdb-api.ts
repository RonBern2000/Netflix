import axios from 'axios'
import { BadRequestError } from '@netflix-utils/shared'
import { API_READ_ACCESS_TOKEN } from "../config/env";
import { IMovie } from '../interfaces/IMovie';

const apiReadAccessToken:string = API_READ_ACCESS_TOKEN!;

export const tmdbGetPopular = async (): Promise<IMovie[] | null> => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiReadAccessToken}`
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

export const tmdbGetAllMovies = (route: string): any => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/11${route}`,
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiReadAccessToken}`
        }
    };
    try{
        const response = axios
            .request(options)
            .then(res => {
                const movies = res.data.results.map((movie: any) => ({
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    release_date: movie.release_date,
                    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count
                }));
                console.log(`here ${movies}`);
            })
            .catch(err => console.error(err));
        return response;
    } catch (error) {
        throw new BadRequestError("Error in fetching movies");
    }
}