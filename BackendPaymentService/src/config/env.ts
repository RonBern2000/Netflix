import "dotenv/config";

export const { 
    RABBITMQ_URL, 
    PROXY_URL, 
    NODE_ENV, 
    PORT, 
    DB_URI
} = process.env;

export const { 
    PAYPAL_CLIENT_ID, 
    PAYPAL_SECRET, 
    PAYPAL_API_BASE_URL, 
    PAYPAL_PLAN_ID
} = process.env;
