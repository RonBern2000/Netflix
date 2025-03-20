import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user-routes";

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

export { app };