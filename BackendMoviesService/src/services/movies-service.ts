import { inject, injectable } from "inversify";
import { IMoviesService } from "../interfaces/IMoviesService";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { IMovie } from "../interfaces/IMovie";
import { BadRequestError } from "@netflix-utils/shared";
import { tmdbGetPopular } from "../utils/tmdb-api";
import { MoviesRequestDTO } from "../DTOs/movies-dto";

@injectable()
export class MoviesService implements IMoviesService{

    constructor(@inject(TOKENS.IMoviesRepository) private moviesRepository: IMoviesRepository){}

    async getPopularMovies(): Promise<IMovie[] | null> {
        let popMovies: IMovie[] | null = await this.moviesRepository.getPopularMovies();
        if(!popMovies){
            popMovies = await tmdbGetPopular();
            await this.moviesRepository.setPopularMovies(popMovies!);
        }
        return popMovies ? popMovies.slice(0, 10) : null; // Top 10
    }
}