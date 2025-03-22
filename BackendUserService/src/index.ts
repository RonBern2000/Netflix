import { app } from "./app";
import { config } from "dotenv";
import { dbConnection } from "./config/db";

config();

const PORT: string = process.env.PORT || '4000';

const start = async () => {

    if(!process.env.DB_URI){
        throw new Error("Missing db url");
    }
    if(!process.env.JWT_KEY){
        throw new Error("Missing jwt token");
    }

    await dbConnection();

    app.listen(PORT, () => {
        console.log("User service listening on port 4000...");
    });
};

start();