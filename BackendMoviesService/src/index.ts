import { app } from "./app";
import { config } from "dotenv";
import fs from 'fs';
import https from 'https';

config();

const PORT: string = process.env.PORT || '4002';

const start = async () => {

    if(!process.env.DB_URI){
        throw new Error("Missing db url");
    }
    if(!process.env.REDIS_PORT){
        throw new Error("Missing redis port");
    }

    //TODO: connection to redis

    const options = {
        key: fs.readFileSync("certs/server.key"),
        cert: fs.readFileSync("certs/server.cert"),
    };

    https.createServer(options, app)
        .listen(PORT, () => {
            console.log("User service listening on port 4002...");
        });
};

start();