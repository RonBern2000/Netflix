import { app } from "./app";
import { config } from "dotenv";
import { dbConnection } from "./config/db";
import fs from "fs";
import https from "https";
import { NODE_ENV, PORT } from "./config/env";

config();

const start = async () => {
  //TODO: Add all the evn variables to validate
  if (!process.env.DB_URI) {
    throw new Error("Missing db url");
  }
  if (!process.env.JWT_KEY) {
    throw new Error("Missing jwt token");
  }

  await dbConnection();

  if (NODE_ENV === "dev") {
    const options = {
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.cert"),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`User service listening on port ${PORT}...`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`User service listening on port ${PORT}...`);
    });
  }
};

start();
