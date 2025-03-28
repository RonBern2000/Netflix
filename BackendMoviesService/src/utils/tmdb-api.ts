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
        const response = await axios.request<{results: IMovie[]}>(options);
        return response.data.results;
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
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
        return response;
    } catch (error) {
        throw new BadRequestError("Error in fetching movies");
    }
}