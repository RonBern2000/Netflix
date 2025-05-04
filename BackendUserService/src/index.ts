import { app } from "./app";
import { dbConnection } from "./config/db";
import fs from "fs";
import https from "https";
import { DB_HOST, DB_NAME, DB_PORT, DB_URI, DB_USERNAME, JWT_KEY, NODE_ENV, PORT, PROXY_URL, RABBITMQ_URL } from "./config/env";
import { rabbit } from "./config/rabbit";
import { PaymentConsumer } from "./rabbitmq/consumers/payment-consumer";
import { InvalidEnvironmentVariablesError } from "@netflix-utils/shared";

const start = async () => {
  if (
    !JWT_KEY || 
    !RABBITMQ_URL || 
    !NODE_ENV || 
    !process.env.USERS_DB_URI ||
    !PORT ||
    !DB_URI ||
    !DB_USERNAME ||
    !DB_NAME ||
    !DB_HOST ||
    !DB_PORT ||
    !PROXY_URL
  ) {
    throw new InvalidEnvironmentVariablesError("Missing user env variables");
  }

  await dbConnection();
  await rabbit.connectRabbitMQ();
  await new PaymentConsumer(rabbit).consume();

  if (NODE_ENV === "dev") {
    const options = {
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.cert"),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`User service listening on port ${PORT}...`);
    });
  } else {
    app.listen(4000, () => {
      console.log(`User service listening on port ${4000}...`);
    });
  }
};

start();
