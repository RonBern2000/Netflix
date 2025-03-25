import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import { errorHandler } from "./middleware/errorHandler.js";

config();

const app = express();

//TODO: validations
const CLIENT_URL = process.env.CLIENT_URL;
const USERS_URL = process.env.USERS_URL;
const PAYMENT_URL = process.env.PAYMENT_URL;
const MOVIES_URL = process.env.MOVIES_URL;

const PORT = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
    origin: [USERS_URL, PAYMENT_URL, MOVIES_URL, CLIENT_URL]
}));

const limiter = rateLimit({
    windowMs: 60000,
    max: 100,
    message: "Too many requests, please try again later"
});

app.use(limiter);

app.use('/users',(req, res, next) => {
    console.log('Original Path:', req.originalUrl);
    next();
},
    createProxyMiddleware({
        target: 'https://localhost:4000',
        changeOrigin: true,
        pathRewrite:{
            '^/users': '',
        },
    })
)

app.use('/payment', 
    createProxyMiddleware({
        target: PAYMENT_URL,
        changeOrigin: true,
        pathRewrite:{
            '^/payment': '',
        },
    })
)

app.use('/movies', 
    createProxyMiddleware({
        target: MOVIES_URL,
        changeOrigin: true,
        pathRewrite:{
            '^/movies': '',
        },
    })
)

app.use(errorHandler)

const options = {
    key: fs.readFileSync("certs/server.key"),
    cert: fs.readFileSync("certs/server.cert"),
};

https.createServer(options, app)
    .listen(PORT, () => {
        console.log("Proxy server listening on port 5000");
    });