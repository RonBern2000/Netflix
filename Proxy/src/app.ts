import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { basicApp, notFoundHandler, errorHandler } from "@netflix-utils/shared";
import { CLIENT_URL, MOVIES_URL, PAYMENT_URL, USERS_URL } from "./config/env";
import { Authenticate } from "../middleware/authenticate";

const app: Application = basicApp([
  USERS_URL!,
  PAYMENT_URL!,
  MOVIES_URL!,
  CLIENT_URL!,
]);

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
  Authenticate ,
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
