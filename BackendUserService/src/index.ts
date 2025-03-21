import { app } from "./app";
import { config } from "dotenv";

config();

const PORT: string = process.env.PORT || '4000';

const start = async () => {

    if(!process.env.DB_URL){
        throw new Error("Missing db url");
    }
    if(!process.env.JWT_KEY){
        throw new Error("Missing jwt token");
    }

    app.listen(PORT, () => {
        console.log("User service listening on port 4000...");
    });
};

start();