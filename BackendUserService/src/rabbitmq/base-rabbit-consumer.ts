import { RabbitMQClient } from "@netflix-utils/shared/build/utils/rabbitmq";

interface Event{
  exchange: string; // TODO enum with all the events
  data: any;
}
export abstract class BaseRabbitMQConsumer<T extends Event>{
    abstract exchange: T['exchange'];
    abstract routingKey: string;
    abstract onMessage(data: T['data']): Promise<void>;

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