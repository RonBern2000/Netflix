import { RabbitMQClient } from "@netflix-utils/shared/build/utils/rabbitmq";

export abstract class BaseRabbitMQConsumer<T = any>{
    abstract exchange: string;
    abstract onMessage(data: T): Promise<void>;

    private rabbit: RabbitMQClient;

    constructor(rabbit: RabbitMQClient) {
    this.rabbit = rabbit;
  }

  async consume(): Promise<void> {
    await this.rabbit.comsumeMessage(
      this.exchange,
      async (data) => {
        await this.onMessage(data);
      }
    );
  }
}