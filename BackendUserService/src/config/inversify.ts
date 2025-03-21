import { Container } from "inversify"
import { UserController } from "../controllers/user-controller";
import { TOKENS } from "../tokens";

const container = new Container();

container.bind<UserController>(TOKENS.UserController).to(UserController);

export { container };