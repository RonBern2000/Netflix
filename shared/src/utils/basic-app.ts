import express from 'express';
import { Application, json, urlencoded } from 'express';
import cors from 'cors';

export const basicApp = (origins: string[]): Application => {
    const app: Application = express();
    
    app.use(json());
    
    app.use(urlencoded({ extended: true }));
    
    app.use(cors({
        credentials: true,
        origin: [...origins]
    }));
    
    app.disable('x-powered-by');

    return app;
};