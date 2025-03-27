import { app } from "./app";
import fs from "fs";
import https from "https";
import {
  CLIENT_URL,
  MOVIES_URL,
  PAYMENT_URL,
  USERS_URL,
  PORT,
  NODE_ENV,
} from "./config/env";

const start = async () => {
  if (
    !USERS_URL ||
    !PAYMENT_URL ||
    !MOVIES_URL ||
    !CLIENT_URL ||
    !NODE_ENV ||
    !PORT
  ) {
    throw new Error("Missing required env variable");
  }

  if (NODE_ENV === "dev") {
    const options = {
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.cert"),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`Proxy server listening on port ${PORT}...`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`Proxy server listening on port ${PORT}...`);
    });
  }
};

start();
