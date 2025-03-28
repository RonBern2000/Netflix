import { createClient } from 'redis';
import { REDIS_PORT, DB_URI } from './env';

const redis = createClient({
    socket: {
        host: DB_URI,
        port: Number(REDIS_PORT),
    },
});

redis.on('connect', () => {
  console.log(`Connected to Redis on port ${REDIS_PORT}`);
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

const connectRedis = async () => {
  try {
    await redis.connect();
    console.log(`Redis client connected on port ${REDIS_PORT}`);
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
};

connectRedis();

export default redis;

// const redis = new createClient({
//     host: 'redis',
//     port: Number(REDIS_PORT),
// });

// redis.on('connect', () => {
//     console.log(`Connected to redis on port ${REDIS_PORT}`);
// });

// redis.on('error', (err) => {
//   console.error('Redis connection error:', err);
// });

// export default redis;