import { app } from "./app";
// import { dbConnection } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const PORT: string = process.env.PORT || '4002';

const start = async () => {

    // if (!process.env.DB_URL) {
    //     throw new Error("Missing db url")
    // }
    // if(!process.env.JWT_KEY) {
    //     throw new Error("Missing jwt key")
    // }

    // await dbConnection();

    app.listen(PORT, () => {
        console.log("Server is listening on port 4002");
    });
};

start();