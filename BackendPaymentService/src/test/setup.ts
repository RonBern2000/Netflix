import { Sequelize } from "sequelize";
import { dbConnection } from "../config/db";

let sequelize: Sequelize;

beforeAll(async() => {

    process.env.JWT_KEY = "ef85748g9wfjmrujg";
    process.env.NODE_ENV = "test";
    
    sequelize = await dbConnection();

});

 

beforeEach(async() => {
    await sequelize.sync({ force: true });
});

afterAll(async() => {
    await sequelize.close();
});