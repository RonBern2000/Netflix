import { paymentConsumer } from "../events/consumer";

export const startAllConsumers = async () => {
  await paymentConsumer();
}