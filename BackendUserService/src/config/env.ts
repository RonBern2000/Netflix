import "dotenv/config";

export const {
  PORT,
  DB_URI,
  JWT_KEY,
  DB_USERNAME,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  RABBITMQ_URL,
  PROXY_URL,
  NODE_ENV,
} = process.env;
