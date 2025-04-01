import { inject, injectable } from "inversify";
import { IMoviesService } from "../interfaces/IMoviesService";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { IMovie } from "../interfaces/IMovie";
import { tmdbGetMoviesByTitle, tmdbGetMoviesByYear, tmdbGetNowPlaying, tmdbGetPopular } from "../utils/tmdb-api";
import { BadRequestError } from "@netflix-utils/shared";
import { ParsedQs } from "qs";

@injectable()
export class MoviesService implements IMoviesService{
    constructor(@inject(TOKENS.IMoviesRepository) private moviesRepository: IMoviesRepository) {}

    async getPopularMovies(): Promise<IMovie[] | null> {
        let popMovies : IMovie[] | null = await this.moviesRepository.getPopularMovies();
        console.log('Is there redis:',popMovies);
        if(!popMovies){
            popMovies = await tmdbGetPopular();
            await this.moviesRepository.setPopularMovies(popMovies!);
            console.log('Ron the king:', popMovies);
        }
        return popMovies ? popMovies.slice(0, 10) : null; // Top 10
    }
    async getNowPlayingMovies(): Promise<IMovie[] | null> {
        let nowPlayingMovies : IMovie[] | null = await this.moviesRepository.getNowPlayingMovies();
        console.log('Is there redis:',nowPlayingMovies);
        if(!nowPlayingMovies){
            nowPlayingMovies = await tmdbGetNowPlaying();
            await this.moviesRepository.setNowPlayingMovies(nowPlayingMovies!);
            console.log('Yehonatan the king:', nowPlayingMovies);
        }
        return nowPlayingMovies ? nowPlayingMovies.slice(0, 10) : null; // Top 10
    }
    async getMoviesByTitle(queryParam: ParsedQs): Promise<IMovie[] | null> {
        const { query } = queryParam;
        if (query && typeof query === 'string')
        {
            let moviesByTitle : IMovie[] | null = await this.moviesRepository.getMoviesByTitle(query);
            console.log('Is there redis:',moviesByTitle);
            if(!moviesByTitle){
                moviesByTitle = await tmdbGetMoviesByTitle(query);
                await this.moviesRepository.setMoviesByTitle(moviesByTitle!);
                console.log('Yehonatan the king:', moviesByTitle);
            }
            return moviesByTitle ? moviesByTitle.slice(0, 20) : null; // Top 20
        }
        throw new BadRequestError('Query is not right');
    }
    async getMoviesByYear(queryParam: ParsedQs): Promise<IMovie[] | null> {
        const { query } = queryParam;
        if (query && typeof query === 'string')
        {
            let moviesByYear : IMovie[] | null = await this.moviesRepository.getMoviesByYear(query);
            console.log('Is there redis:',moviesByYear);
            if(!moviesByYear){
                moviesByYear = await tmdbGetMoviesByYear(query);
                await this.moviesRepository.setMoviesByYear(moviesByYear!);
                console.log('Yehonatan the king:', moviesByYear);
            }
            return moviesByYear ? moviesByYear.slice(0, 20) : null; // Top 20
        }
        throw new BadRequestError('Query is not right');
    }
}

 // await redis.del(TOKENS.popularMovies);
        // let data: string | null = await redis.get(TOKENS.popularMovies);
        // console.log('Is there data:',data);
        // let popMovies:IMovie[] | null = data ? JSON.parse(data) : null;



    // async getPopularMovies(): Promise<IMovie[] | null> {
    //     let data: string | null = await redis.get(TOKENS.popularMovies);
    //     let popMovies:IMovie[] | null = data ? JSON.parse(data) : null;
    //     console.log('Movies came from redis:',popMovies);
    //     if(!popMovies){
    //         popMovies = await tmdbGetPopular();
    //         await redis.set(TOKENS.popularMovies, JSON.stringify(popMovies));
    //         console.log('Movies came from db:', popMovies);
    //     }
    //     return popMovies ? popMovies.slice(0, 10) : null; // Top 10
    // }

