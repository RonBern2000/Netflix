import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user-sql-entity";
import { UserToMovie } from "../models/user-like-sql-entity";
import { DB_URI, NODE_ENV } from "./env";

export class MySqlConnection{
    private static instance: Sequelize | null = null;
    private constructor(){}

    public static async getInstance(): Promise<Sequelize> {
        if(!MySqlConnection.instance){
            let sequelize: Sequelize;
            if(NODE_ENV === "test")
            {
                sequelize = new Sequelize({
                    dialect: "sqlite",
                    storage: ":memory:",
                    logging: false,
                    models: [User, UserToMovie],
                });
            }
            else {
                sequelize = new Sequelize(DB_URI as string, {
                    dialect: "mysql",
                    logging: false,
                    models: [User, UserToMovie],
                });
            }

            try {
                await sequelize.authenticate();
                console.log("MySql Database connected");
                try {
                    await sequelize.sync({ alter: false, force: false });
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