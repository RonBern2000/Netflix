import { inject, injectable } from "inversify";
import { IMoviesService } from "../interfaces/IMoviesService";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMoviesRepository";
import { IMovies } from "../interfaces/IMovies";
import { publishMessage } from "../utils/rabbitmq";
import {BadRequestError} from '../../../shared/src/errors/bad-request-error';
import { MoviesRequestDTO } from "../DTOs/movies-dto";

@injectable()
export class MoviesService implements IMoviesService{

    constructor(@inject(TOKENS.IMoviesRepository) private moviesRepository: IMoviesRepository){}
    async movies(data: MoviesRequestDTO): Promise<string> {
        const { name, ganre } = data;
        const existingMovies = await this.moviesRepository.findMoviesByEmail(name);

        if(!existingMovies){
            throw new Error("Movies not found");
        }

        const isValidGanre: boolean = await this.moviesRepository.findMoviesByGanre(ganre);

        if(!isValidGanre){
            throw new Error("Invalid ganre");
        }

        await publishMessage("movies.login", { id: existingMovies.id, name: existingMovies.name, trailer: existingMovies.trailer });
    }
}