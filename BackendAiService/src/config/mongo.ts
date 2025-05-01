import mongoose from "mongoose";
import { DB_URI } from "./env";

export class MongoDBConnection {
  private static instance: typeof mongoose | null = null;

  private constructor() {}

  public static async getInstance(): Promise<typeof mongoose> {
    if(!MongoDBConnection.instance) {
        try {
            MongoDBConnection.instance = await mongoose.connect(DB_URI!);
            console.log("MongoDb online");
        } catch (error) {
            console.error(error);
            throw new Error("Database connection error");
        }
    }
    return MongoDBConnection.instance;
  }
}