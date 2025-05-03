import { Exchanges } from "./exchanges";
import { RabbitMQClient } from "./rabbitmq";

interface Event{
  exchange: Exchanges;
  data: any;
}
export abstract class BaseRabbitMQConsumer<T extends Event>{
    abstract exchange: T['exchange'];
    abstract routingKey: string;
    abstract onMessage(data: T['data'], ack: () => void, nack: () => void): Promise<void>;

    protected rabbit: RabbitMQClient;

    constructor(rabbit: RabbitMQClient) {
    this.rabbit = rabbit;
  }

  async consume(): Promise<void> {
        await this.rabbit.comsumeMessage(
            this.exchange,
            this.routingKey,
            async (data, ack, nack) => {
                try {
                    await this.onMessage(data, ack, nack);
                } catch (error) {
                    console.error(`Error processing message from ${this.exchange}:`, error);
                    nack();
                }
            }
        );
    }
}