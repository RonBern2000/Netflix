import { Container } from "inversify"
import { MoviesController } from "../controllers/movies-controller";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMovieRepository";
import { MoviesRepository } from "../repositories/movies-repository";
import { MoviesMockRepository } from "../repositories/movies-mock-repository";
import { IMoviesService } from "../interfaces/IMoviesService";
import { MoviesService } from "../services/movies-service";

const container = new Container();

if(process.env.NODE_ENV !== "test"){
    container.bind<IMoviesRepository>(TOKENS.IMoviesRepository).to(MoviesRepository);
}
else{
    container.bind<IMoviesRepository>(TOKENS.IMoviesRepository).to(MoviesMockRepository);
}
container.bind<IMoviesService>(TOKENS.IMoviesService).to(MoviesService);
container.bind<MoviesController>(TOKENS.MoviesController).to(MoviesController);

export { container };