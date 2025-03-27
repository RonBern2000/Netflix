import { app } from "./app";
import fs from "fs";
import { NODE_ENV, PORT } from "./config/env";
import https from "https";

const start = async () => {
  //TODO: Validations for env variables
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
