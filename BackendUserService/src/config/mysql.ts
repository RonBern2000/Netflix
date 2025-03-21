import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user-sql-entity";
import { config } from "dotenv";

config();

export class MySqlConnection{
    private static instance: Sequelize | null = null;
    private constructor(){}

    public static async getInstance(): Promise<Sequelize> {
        if(!MySqlConnection.instance){
            const sequelize = new Sequelize(process.env.DB_URL as string, {
                dialect: "mysql",
                logging: false,
                models: [User],
            });

            try {
                await sequelize.authenticate();
                console.log("MySql Database connected");
                await sequelize.sync({ alter: true });
                return sequelize;
            } catch (error) {
                throw new Error("Database connection error!");
            }
        }
        return MySqlConnection.instance;
    }
}