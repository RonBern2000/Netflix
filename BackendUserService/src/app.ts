import { Application } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user-routes";
import { basicApp, notFoundHandler, errorHandler } from "@netflix-utils/shared";
import { PROXY_URL, RABBITMQ_URL } from "./config/env";

const app: Application = basicApp([PROXY_URL!, RABBITMQ_URL!]);

app.use(cookieParser());

// https://localhost:5000/users/api/v1/users/login from the client => /api/v1/users/login when here
app.use("/api/v1/users", userRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export { app };
