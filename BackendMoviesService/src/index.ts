import { app } from "./app";
import fs from "fs";
import https from "https";
import { DB_URI, NODE_ENV, REDIS_PORT, PORT, API_READ_ACCESS_TOKEN, API_KEY, RABBITMQ_URL, PROXY_URL } from "./config/env";
import { InvalidEnvironmentVariablesError } from '@netflix-utils/shared/build/errors/invalid-enviroment-variable-error'

const start = async () => {
  if (!DB_URI || !PORT || !REDIS_PORT || !API_READ_ACCESS_TOKEN || !API_KEY || !RABBITMQ_URL || !PROXY_URL || !NODE_ENV) {
    throw new InvalidEnvironmentVariablesError("Missing required movie env variable");
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
    app.listen(4002, () => {
      console.log(`Movies service listening on port ${4002}...`);
    });
  }
};

start();
