import { MySqlConnection } from './mysql';
import { DB_URI } from './env';

export const dbConnection = async() => {
    if(!DB_URI){
        throw new Error("Database URI does not exist");
    }
    return await MySqlConnection.getInstance();
}