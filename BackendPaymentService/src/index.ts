import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
    app.listen(4001, () => {
        console.log("Server is listening on port 4001");
    });
}

//import { dbConnection } from "./config/db";
// 

//     if (!process.env.DB_URL) {
//         throw new Error("Missing db url")
//     }
//     if(!process.env.JWT_KEY) {
//         throw new Error("Missing jwt key")
//     }

//     await dbConnection();

   
//};

start();