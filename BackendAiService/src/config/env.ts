import "dotenv/config";

export const {
  REDIS_URI,
  REDIS_PORT,
  DB_URI,
  GROQ_API_KEY,
  RABBITMQ_URL,
  GEMINI_API_KEY,
  PROXY_URL,
  NODE_ENV,
  PORT
} = process.env;