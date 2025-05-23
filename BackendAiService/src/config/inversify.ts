import { Container } from "inversify"
import { UserToMovieController } from "../controllers/user-to-movie-controller";
import { TOKENS } from "../tokens";
import { IUserToMovieService } from "../interfaces/IUserToMovieService";
import { IUserToMovieRepository } from "../interfaces/IUserToMovieRepository";
import { UserToMovieRepository } from "../repositories/user-to-movie-repository";
import { UserToMovieService } from "../services/user-to-movie-service";
import { AI2Service } from "../services/gemini-service";
import { IAIService } from "../interfaces/IAIService";

const container = new Container();

container.bind<IUserToMovieRepository>(TOKENS.IUserToMovieRepository).to(UserToMovieRepository);
container.bind<IUserToMovieService>(TOKENS.IUserToMovieService).to(UserToMovieService);
container.bind<IAIService>(TOKENS.IAIService).to(AI2Service);
container.bind<UserToMovieController>(TOKENS.UserToMovieController).to(UserToMovieController);

export { container };