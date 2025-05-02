import { app } from "./app";
import fs from "fs";
import https from "https";
import {  REDIS_URI,
  REDIS_PORT,
  DB_URI,
  GROQ_API_KEY,
  RABBITMQ_URL,
  PROXY_URL,
  NODE_ENV,
  PORT } from "./config/env";
import { InvalidEnvironmentVariablesError } from '@netflix-utils/shared/build/errors/invalid-enviroment-variable-error'
import { dbConnection } from "./config/db";
import { rabbit } from "./config/rabbit";
import { UserAddConsumer } from "./rabbitmq/consumers/user-add-consumer";
import { UserRemoveConsumer } from "./rabbitmq/consumers/user-remove-consumer";

const start = async () => {
  if (!DB_URI || !PORT || !REDIS_PORT || !RABBITMQ_URL || !PROXY_URL || !NODE_ENV ! || !REDIS_URI || !GROQ_API_KEY) {
    throw new InvalidEnvironmentVariablesError("Missing required movie env variable");
  }

  await dbConnection();
  await rabbit.connectRabbitMQ();
  await new UserAddConsumer(rabbit).consume();
  await new UserRemoveConsumer(rabbit).consume();

  if (NODE_ENV === "dev") {
    const options = {
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.cert"),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`AI service listening on port ${PORT}...`);
    });
  } else {
    app.listen(4003, () => {
      console.log(`AI service is listening on port ${4003}...`);
    });
  }
};

start();
