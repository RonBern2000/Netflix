import { Application } from "express";
import moviesRouter from "./routes/movies-routes";
import { basicApp, notFoundHandler, errorHandler } from "@netflix-utils/shared";
import { PROXY_URL, RABBITMQ_URL } from "./config/env";
import { connectRabbitMQ } from "./utils/rabbitmq";

const app: Application = basicApp([PROXY_URL!, RABBITMQ_URL!]);

app.use("/api/v1/movies", moviesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

connectRabbitMQ().catch(console.error);

export { app };
