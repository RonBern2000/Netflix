import express, { Application } from "express";
import cors from "cors";
import paymentRounter from "./routes/payment-routes";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5000","http://localhost:5672"],
  })
);

app.use("/api/payments", paymentRounter);

export { app };