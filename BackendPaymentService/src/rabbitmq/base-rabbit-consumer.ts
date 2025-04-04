import { RabbitMQClient } from "@netflix-utils/shared/build/utils/rabbitmq";

//TODO: create an interface for T
export abstract class BaseRabbitMQConsumer<T = any>{
    abstract exchange: string;
    abstract routingKey: string;
    abstract onMessage(data: T): Promise<void>;

    protected rabbit: RabbitMQClient;

    constructor(rabbit: RabbitMQClient) {
    this.rabbit = rabbit;
  }

  async consume(): Promise<void> {
    await this.rabbit.comsumeMessage(
      this.exchange,
      this.routingKey,
      async (data) => {
        await this.onMessage(data);
      }
    );
  }
}