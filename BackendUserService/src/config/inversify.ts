import { Container } from "inversify"
import { UserController } from "../controllers/user-controller";
import { TOKENS } from "../tokens";
import { IUserRepository } from "../interfaces/IUserRepository";
import { UserSqlRepository } from "../repositories/user-mysql-repository";
import { IUserService } from "../interfaces/IUserService";
import { UserService } from "../services/user-service";
import { IUserLikeRepository } from "../interfaces/IUserLikeRepository";
import { UserLikeRepository } from "../repositories/user-like-mysql-repository";
import { IUserLikeService } from "../interfaces/IUserLikeService";
import { UserLikeService } from "../services/user-like-service";
import { UserLikeController } from "../controllers/user-like-controller";

const container = new Container();

container.bind<IUserRepository>(TOKENS.IUserRepository).to(UserSqlRepository);
container.bind<IUserService>(TOKENS.IUserService).to(UserService);
container.bind<UserController>(TOKENS.UserController).to(UserController);

container.bind<IUserLikeRepository>(TOKENS.IUserLikeRepository).to(UserLikeRepository);
container.bind<IUserLikeService>(TOKENS.IUserLikeService).to(UserLikeService);
container.bind<UserLikeController>(TOKENS.UserLikeController).to(UserLikeController);

export { container };