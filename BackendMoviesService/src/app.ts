import express, { Application, Request, Response } from "express";
import cors from "cors";
import moviesRouter from "./routes/movies-routes";
import { connectRabbitMQ } from "./utils/rabbitmq";
import { errorHandler } from '../../shared/middleware/error-handler';
import notFoundHandler from '../../shared/middleware/not-found-hadler';


const app: Application = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ["https://proxy:5000", "http://rabbitmq:5672"]
    })
);

app.use("/api/movies", moviesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

connectRabbitMQ().catch(console.error);

export { app };