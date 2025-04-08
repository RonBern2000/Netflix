import { Application } from "express";
import paymentRounter from "./routes/payment-routes";
import { basicApp, errorHandler, notFoundHandler } from "@netflix-utils/shared";
import { PROXY_URL, RABBITMQ_URL } from "./config/env";

const app: Application = basicApp([PROXY_URL!, RABBITMQ_URL!]);

app.use("/api/v1/payments", paymentRounter);

app.use(errorHandler);
app.use(notFoundHandler);

export { app };
