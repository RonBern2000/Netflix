import { app } from "./app";
import fs from "fs";
import { NODE_ENV, PORT } from "./config/env";
import https from "https";
import { dbConnection } from "./config/db";
import { rabbit } from "./config/rabbit";
import { SignedUpConsumer } from "./rabbitmq/consumers/signup-consumer";
import { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE_URL, PAYPAL_PLAN_ID} from "./config/env";
import { BadRequestError } from '@netflix-utils/shared'

const start = async () => {
  
  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET || !PAYPAL_API_BASE_URL || !PAYPAL_PLAN_ID) {
    throw new BadRequestError("Missing PayPal configuration in .env file");
  }

  await dbConnection();
  //await rabbit.connectRabbitMQ();
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
    app.listen(PORT, () => {
      console.log(`Payment service listening on port ${PORT}...`);
    });
  }
};

start();
