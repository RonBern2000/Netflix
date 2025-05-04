import { Sequelize } from "sequelize";
import { dbConnection } from "../config/db";
import moxios from 'moxios';

let sequelize: Sequelize;

beforeAll(async() => {

    process.env.JWT_KEY = "ef85748g9wfjmrujg";
    process.env.NODE_ENV = "test";
    
    sequelize = await dbConnection();

});

 

beforeEach(async() => {
    await sequelize.sync({ force: true });
    moxios.install()
});

afterEach(async() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
});

afterAll(async() => {
    await sequelize.close();
});