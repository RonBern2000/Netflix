import { Container } from "inversify"
import { UserController } from "../controllers/user-controller";
import { TOKENS } from "../tokens";
import { IUserRepository } from "../interfaces/IUserRepository";
import { UserSqlRepository } from "../repositories/user-mysql-repository";
import { IUserService } from "../interfaces/IUserService";
import { UserService } from "../services/user-service";

const container = new Container();

container.bind<IUserRepository>(TOKENS.IUserRepository).to(UserSqlRepository);
container.bind<IUserService>(TOKENS.IUserService).to(UserService);
container.bind<UserController>(TOKENS.UserController).to(UserController);

export { container };