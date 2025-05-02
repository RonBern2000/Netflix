import { MySqlConnection } from './mysql';

export const dbConnection = async() => {
    return await MySqlConnection.getInstance();
}