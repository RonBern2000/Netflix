import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";
import cors from 'cors';
import fs from 'fs';
import https from 'https';

config();

const app = express();

const TARGET_URLS = process.env.ALLOWED_ORIGINS.split(',');

const CLIENT_URL = process.env.CLIENT_URL;

const PORT = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
    origin: [...TARGET_URLS, CLIENT_URL]
}));

const limiter = rateLimit({
    windowMs: 60000,
    max: 100,
    message: "Too many requests, please try again later"
});

app.use(limiter);

TARGET_URLS.forEach(r => {
    app.use(r, 
        createProxyMiddleware({
            target: r,
            changeOrigin: true
        })
    )
});

const options = {
    key: fs.readFileSync("certs/server.key"),
    cert: fs.readFileSync("certs/server.cert"),
};

https.createServer(options, app)
    .listen(PORT, () => {
        console.log("Proxy server listening on port 5000");
    });