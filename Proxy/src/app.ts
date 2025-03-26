import express from "express";
import { Request, Response, Application, NextFunction } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { config } from "dotenv";
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import { errorHandler } from "../middleware/error-handler.js";
import notFoundHandler from "../middleware/not-found-hadler.js";

config();

const app: Application = express();
app.use(express.json());

//TODO: validations
const CLIENT_URL: string = process.env.CLIENT_URL!;
const USERS_URL: string = process.env.USERS_URL!;
const PAYMENT_URL: string = process.env.PAYMENT_URL!;
const MOVIES_URL: string = process.env.MOVIES_URL!;

app.use(cors({
    credentials: true,
    origin: [USERS_URL, PAYMENT_URL, MOVIES_URL, CLIENT_URL]
}));

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 60000,
    max: 100,
    message: "Too many requests, please try again later"
});

app.use(limiter);

app.use('/api/v1/users',
    createProxyMiddleware({
        target: USERS_URL,
        changeOrigin: true,
        secure: false,
        on:{
            error: (error, req, res, target) => {
                console.error(error);
            }
        }
    })
);

app.use('/api/v1/payment',
    createProxyMiddleware({
        target: PAYMENT_URL,
        changeOrigin: true,
        secure: false,
        on:{
            error: (error, req, res, target) => {
                console.error(error);
            }
        }
    })
);

app.use('/api/v1/movies', 
    createProxyMiddleware({
        target: MOVIES_URL,
        changeOrigin: true,
        secure: false,
        on:{
            error: (error, req, res, target) => {
                console.error(error);
            }
        }
    })
);

app.use(errorHandler);
app.use(notFoundHandler);

export { app };