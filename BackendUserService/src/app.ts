import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user-routes";
import { connectRabbitMQ } from "./utils/rabbitmq";
import { errorHandler } from '../../shared/middleware/error-handler';
import notFoundHandler from "../../shared/middleware/not-found-hadler";

const app: Application = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ["https://proxy:5000", "http://rabbitmq:5672"]
    })
);

app.use(cookieParser());

// https://localhost:5000/users/api/v1/users/login from the client => /api/v1/users/login when here
app.use("/api/v1/users", userRouter);

app.use(errorHandler);
app.use(notFoundHandler);

connectRabbitMQ().catch(console.error);

export { app };