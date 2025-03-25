import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT: string = process.env.PORT || '4002';

const start = async () => {
    app.listen(PORT, () => {
        console.log("Server is listening on port 4002");
    });
};

start();