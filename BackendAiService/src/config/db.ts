import { MongoDBConnection } from './mongo';

export const dbConnection = async() => {
    return await MongoDBConnection.getInstance();
}