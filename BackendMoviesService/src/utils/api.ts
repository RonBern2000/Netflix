import axios from 'axios'
import { config } from 'dotenv';
import { generateCustomError } from '../../../shared/middleware/error-handler';
import { NextFunction } from 'express';

config();

const API_READ_ACCESS_TOKEN:string = process.env.API_READ_ACCESS_TOKEN!;
function apifetch(route: string, next: NextFunction) {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/11${route}`,
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
        }
    };
    
    try{
        axios
            .request(options)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    } catch (error) {
        console.error('Error fetching movie data:', error);
        next(generateCustomError({ message: 'Error fetching data from the API' }, 500))
    }
}

export default apifetch;