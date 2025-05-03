import amqp, { Channel, ChannelModel} from "amqplib";

export class RabbitMQClient{
    private connection!: ChannelModel;
    private channel!: Channel;

    constructor(private url: string){}

    async connectRabbitMQ(){
        try {
            this.connection = await amqp.connect(this.url);
            this.channel = await this.connection.createChannel();
            console.log("Connected to RabbitMQ");
        } catch (error) {
            console.error("RabbitMQ Connection Error:", error);
            throw error;
        }
    }

    async publishMessage(exchange: string, routingKey: string, message: object){
        if (!this.channel) {
            console.error("RabbitMQ channel is not initialized.");
            return;
        }

        await this.channel.assertExchange(exchange, 'topic', {
            durable: false
        });

        this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

        console.log(`Message sent to queue [${exchange}]:`, message);
    }

    async comsumeMessage(exchange: string, routingKey: string,onMessage: (msg: any, ack: () => void, nack: () => void) => Promise<void>){
        if(!this.channel){
            console.error("RabbitMQ channek is not initialized.");
            return;
        }

        await this.channel.assertExchange(exchange, 'topic',{
            durable: false,
        });

        const q = await this.channel.assertQueue("", {
            exclusive: true,
        });

        await this.channel.bindQueue(q.queue, exchange, routingKey);
        console.log(" [*] Waiting for messages. To exit press CTRL+C");

        this.channel.consume(
        q.queue,
        (msg) => {
            if (msg) {
                const content = msg.content.toString();
                try {
                    const data = JSON.parse(content);

                    const ack = () => this.channel.ack(msg);
                    const nack = () => this.channel.nack(msg, false, true);

                    onMessage(data, ack, nack).catch((err) => {
                        console.error("Error processing message:", err);
                        nack();
                    });
                } catch (err) {
                    console.error("Failed to parse message:", err);
                    this.channel.nack(msg, false, true);
                }
            }
        },
        {
            noAck: false,
        });
    } 
}