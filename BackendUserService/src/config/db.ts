import { MySqlConnection } from './mysql';
import { config } from 'dotenv';

config();

export const dbConnection = async() => {
    if(!process.env.DB_URI){
        throw new Error("Database URI does not exist");
    }
    return await MySqlConnection.getInstance();
}