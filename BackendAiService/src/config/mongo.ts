import mongoose from "mongoose";

export class MongoDBConnection {
  private static instance: typeof mongoose | null = null;

  private constructor() {}

  public static async getInstance(): Promise<typeof mongoose> {
    if(!MongoDBConnection.instance) {
        try {
            MongoDBConnection.instance = await mongoose.connect(process.env.AI_DB_URI!);
            console.log("MongoDb online");
        } catch (error) {
            console.error(error);
            throw new Error("Database connection error");
        }
    }
    return MongoDBConnection.instance;
  }
}