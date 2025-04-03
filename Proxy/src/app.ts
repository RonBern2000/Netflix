import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { notFoundHandler, errorHandler } from "@netflix-utils/shared";
import { CLIENT_URL, MOVIES_URL, PAYMENT_URL, USERS_URL } from "./config/env";
import express from 'express';
import { Application, urlencoded } from 'express';
import cors from 'cors';
import { authenticate } from "../middleware/authenticate";

const app: Application = express();

app.use(urlencoded({ extended: true }));

app.use(cors({
    credentials: true,
    origin: [
        USERS_URL!,
        PAYMENT_URL!,
        MOVIES_URL!,
        CLIENT_URL!
    ]
}));

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60000,
  max: 100,
  message: "Too many requests, please try again later",
});

app.use(limiter);

app.use(
  "/users",
  createProxyMiddleware({
    target: USERS_URL,
    changeOrigin: true,
    secure: false,
    on: {
      error: (error, req, res, target) => {
        console.error(error);
      },
    },
    pathRewrite: {
      '^/users': '',
    },
  })
);

app.use(
  "/payments",
  createProxyMiddleware({
    target: PAYMENT_URL,
    changeOrigin: true,
    secure: false,
    on: {
      error: (error, req, res, target) => {
        console.error(error);
      },
    },
    pathRewrite: {
      '^/payment': '',
    },
  })
);

app.use(
  "/movies",
  authenticate,
  createProxyMiddleware({
    target: MOVIES_URL,
    changeOrigin: true,
    secure: false,
    on: {
      error: (error, req, res, target) => {
        console.error(error);
      },
    },
    pathRewrite: {
      '^/movies': '',
    },
  })
);

app.use(errorHandler);
app.use(notFoundHandler);

export { app };