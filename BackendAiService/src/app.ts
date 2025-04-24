import { Application } from "express";
import userToMovieRouter from "./routes/user-to-movie-routes";
import { basicApp, notFoundHandler, errorHandler } from "@netflix-utils/shared";
import { PROXY_URL, RABBITMQ_URL } from "./config/env";

const app: Application = basicApp([PROXY_URL!, RABBITMQ_URL!]);

app.use("/reccomendations", userToMovieRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export { app };
