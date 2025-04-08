import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user-sql-entity";
import { DB_URI } from './env';

export class MySqlConnection{
    private static instance: Sequelize | null = null;
    private constructor(){}

    public static async getInstance(): Promise<Sequelize> {
        if(!MySqlConnection.instance){
            const sequelize = new Sequelize(DB_URI as string, {
                dialect: "mysql",
                logging: false,
                models: [User],
            });

            try {
                await sequelize.authenticate();
                console.log("MySql Database connected");
                try {
                    await sequelize.sync({ alter: true, force: false });
                } catch (error) {
                    console.error("Sequelize sync error:", error);
                }
                return sequelize;
            } catch (error) {
                throw new Error("Database connection error!");
            }
        }
        return MySqlConnection.instance;
    }
}