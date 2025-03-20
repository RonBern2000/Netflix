import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";

const app = express();

const TARGET_URLS = ["http://localhost:4000", "http://localhost:4001", "http://localhost:4002"];

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

// app.use("/", 
//     // createProxyMiddleware({
//     //     target: TARGET_URLS,
//     //     changeOrigin: true
//     // })
// );

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Proxy server");
});