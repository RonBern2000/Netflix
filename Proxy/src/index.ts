import { app } from "./app";
import { config } from "dotenv";
import fs from 'fs';
import https from 'https';

config();

const PORT: string = process.env.PORT || '4000';

const start = async () => {

    if(!process.env.USERS_URL){
        throw new Error("Missing users url");
    }
    if(!process.env.PAYMENT_URL){
        throw new Error("Missing payment url");
    }
    if(!process.env.MOVIES_URL){
        throw new Error("Missing movies url");
    }
    if(!process.env.CLIENT_URL){
        throw new Error("Missing client url");
    }
    if(!process.env.PORT){
        throw new Error("Missing port");
    }

    const options = {
        key: fs.readFileSync("certs/server.key"),
        cert: fs.readFileSync("certs/server.cert"),
    };

    https.createServer(options, app)
        .listen(PORT, () => {
            console.log("Proxy server listening on port 5000");
        });
};

start();