import amqp, { Channel, ChannelModel} from "amqplib";
import { config } from "dotenv";

config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq";

let connection: ChannelModel;
let channel: Channel;

export const connectRabbitMQ = async() => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
        throw error;
    }
}

export const publishMessage = async (queue: string, message: object) => {
    if (!channel) {
        console.error("RabbitMQ channel is not initialized.");
        return;
    }

    await channel.assertQueue(queue, { 
        durable: true 
    });
    
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true
    });

    console.log(`Message sent to queue [${queue}]:`, message);
};