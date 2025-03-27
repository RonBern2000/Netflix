import "dotenv/config";

export const {
  PORT,
  DB_URI,
  REDIS_PORT,
  API_READ_ACCESS_TOKEN,
  API_KEY,
  RABBITMQ_URL,
  PROXY_URL,
  NODE_ENV,
} = process.env;
