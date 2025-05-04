import { app } from "./app";
import fs from "fs";
import { DB_URI, NODE_ENV, PORT, PROXY_URL, RABBITMQ_URL } from "./config/env";
import https from "https";
import { dbConnection } from "./config/db";
import { rabbit } from "./config/rabbit";
import { SignedUpConsumer } from "./rabbitmq/consumers/signup-consumer";
import { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE_URL, PAYPAL_PLAN_ID} from "./config/env";
import { InvalidEnvironmentVariablesError } from '@netflix-utils/shared'

const start = async () => {
  if (
    !PAYPAL_CLIENT_ID || 
    !PAYPAL_SECRET || 
    !PAYPAL_API_BASE_URL || 
    !PAYPAL_PLAN_ID || 
    !process.env.PAYMENTS_DB_URI || 
    !RABBITMQ_URL || 
    !PROXY_URL || 
    !NODE_ENV || 
    !PORT || 
    !DB_URI
  ) {
    throw new InvalidEnvironmentVariablesError("Missing required payment env variable");
  }

  await dbConnection();
  await rabbit.connectRabbitMQ();
  const signedUpConsumer = new SignedUpConsumer(rabbit);
  await signedUpConsumer.consume();

  if (NODE_ENV === "dev") {
    const options = {
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.cert"),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`Payment service listening on port ${PORT}...`);
    });
  } else {
    app.listen(4001, () => {
      console.log(`Payment service listening on port ${4001}...`);
    });
  }
};

start();
