import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user-routes";
import { errorHandler } from "./middleware/error-handler";
import { connectRabbitMQ } from "./utils/rabbitmq";

const app: Application = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5000", "http://localhost:5672"]
    })
);

app.use(cookieParser());

app.use("/api/users", userRouter);

app.use(errorHandler);

connectRabbitMQ().catch(console.error);

export { app };