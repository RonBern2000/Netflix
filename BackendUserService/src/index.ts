import { app } from "./app";
import { config } from "dotenv";

config();

const start = async () => {
    app.listen(4000, () => {
        console.log("User service listening on port 4000");
    });
};

start();