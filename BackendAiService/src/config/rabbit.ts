import { RabbitMQClient } from "@netflix-utils/shared/build/utils/rabbitmq";
import { RABBITMQ_URL } from "./env";

export const rabbit: RabbitMQClient = new RabbitMQClient(RABBITMQ_URL!);