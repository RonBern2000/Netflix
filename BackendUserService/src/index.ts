import { app } from "./app";
import { dbConnection } from "./config/db";
import fs from "fs";
import https from "https";
import { DB_URI, JWT_KEY, NODE_ENV, PORT, RABBITMQ_URL } from "./config/env";
import { rabbit } from "./config/rabbit";
import { PaymentConsumer } from "./rabbitmq/consumers/payment-consumer";

const start = async () => {
  console.log("User service starting...");
  //TODO: Add all the evn variables to validate
  if (!DB_URI) {
    throw new Error("Missing db url");
  }
  if (!JWT_KEY || !RABBITMQ_URL) {
    throw new Error("Missing env variables");
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
