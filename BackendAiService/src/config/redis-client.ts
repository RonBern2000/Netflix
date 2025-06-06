import { createClient } from 'redis';

const redis = createClient({
    url: `redis://${process.env.REDIS_URI}:${process.env.REDIS_PORT}`,
});

redis.on('connect', () => {
  console.log(`Connected to Redis on port ${process.env.REDIS_PORT}`);
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

const connectRedis = async () => {
  try {
    await redis.connect();
    console.log(`Redis client connected on port ${process.env.REDIS_PORT}`);
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
};

connectRedis();

export default redis;