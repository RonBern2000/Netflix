import { app } from "./app";
import fs from "fs";
import https from "https";
import { DB_URI, NODE_ENV, REDIS_PORT, PORT, API_READ_ACCESS_TOKEN, API_KEY, RABBITMQ_URL, PROXY_URL } from "./config/env";

const start = async () => {
  if (!DB_URI || !PORT || !REDIS_PORT || !API_READ_ACCESS_TOKEN || !API_KEY || !RABBITMQ_URL || !PROXY_URL || !NODE_ENV) {
    throw new Error("Missing required movie env variable");
  }

  if (NODE_ENV === "dev") {
    const options = {
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.cert"),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`Movies service listening on port ${PORT}...`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`Movies service listening on port ${PORT}...`);
    });
  }
};

start();
