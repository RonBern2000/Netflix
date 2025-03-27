import axios from 'axios'
import { BadRequestError } from '@netflix-utils/shared'
import { API_READ_ACCESS_TOKEN } from "../config/env";

const apiReadAccessToken:string = API_READ_ACCESS_TOKEN!;

export const apifetch = (route: string) => {
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