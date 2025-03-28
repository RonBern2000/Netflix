import Redis from "ioredis";
import { REDIS_PORT } from './env';

const redis = new Redis({
    host: 'host.docker.internal',
    port: Number(REDIS_PORT),
});

redis.on('connect', () => {
    console.log(`Connecte to redis on por ${REDIS_PORT}`);
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redis;