import { Application } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user-routes";
import userLikeRouter from './routes/user-like-routes';
import { basicApp, notFoundHandler, errorHandler } from "@netflix-utils/shared";
import { PROXY_URL, RABBITMQ_URL } from "./config/env";

const app: Application = basicApp([PROXY_URL!, RABBITMQ_URL!]);

app.use(cookieParser());

app.use("/users", userRouter);
app.use("/usersLike", userLikeRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export { app };
