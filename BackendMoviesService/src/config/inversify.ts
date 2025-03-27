import { Container } from "inversify"
import { MoviesController } from "../controllers/movies-controller";
import { TOKENS } from "../tokens";
import { IMoviesRepository } from "../interfaces/IMoviesRepository";
import { MoviesReddisRepository } from "../repositories/movies-reddis-repository";
import { IMoviesService } from "../interfaces/IMoviesService";
import { MoviesService } from "../services/movies-service";

const container = new Container();

container.bind<IMoviesRepository>(TOKENS.IMoviesRepository).to(MoviesReddisRepository);
container.bind<IMoviesService>(TOKENS.IMoviesService).to(MoviesService);
container.bind<MoviesController>(TOKENS.MoviesController).to(MoviesController);

export { container };