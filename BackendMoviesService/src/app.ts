import express, { Application, Request, Response } from "express";
import cors from "cors";
import moviesRouter from "./routes/movies-routes";

const app: Application = express()

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5000", "http://localhost:5672"],
  })
);

app.use("/api/movies", moviesRouter);

export { app };
