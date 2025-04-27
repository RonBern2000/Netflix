import request from 'supertest';
import { app } from '../../app';

describe("Tests for USER CONTROLLER", () => {

    describe("signup", () => {
        it("Should return 200 if signup successfully", async () => {
            const response = await request(app).post("/users/signup").send({
                email: 'test@test.com',
                password: 'test123'
            });

            expect(response.status).toBe(200);
        });

        it("Should return 400 if email isnt valid", async () => {
            const response = await request(app).post("/users/signup").send({
                email: 'notAValidEmail',
                password: 'test123'
            });

            expect(response.status).toBe(400);
        });

        it("Should return 400 if you send it without a password", async () => {
            const response = await request(app).post("/users/signup").send({
                email: 'test@test.com'
            });

            expect(response.status).toBe(400);
        });

        it("Should return 400 if password length is shorter than 6", async () => {
            const response = await request(app).post("/users/signup").send({
                email: 'test@test.com',
                password: 'short'
            });

            expect(response.status).toBe(400);
        });
    });

    describe("checkEmailExist", () => {
        it("Should return 200 if email exists in the database", async () => {
            await request(app).post("/users/signup").send({
                email: 'test@test.com',
                password: 'test123'
            });

            const response = await request(app).post("/users/checkEmail").send({
                email: 'test@test.com'
            });

            expect(response.status).toBe(200);
        });

        it("Should return 404 if email doesnt exist in the database", async () => {
            const response = await request(app).post("/users/checkEmailExist").send({
                email: 'test@test.com'
            });
            expect(response.status).toBe(404);
        });
    });

    describe('login', () => { 
        it("Should return 200 if login successfully", async () => {
            await request(app).post("/users/signup").send({
                email: 'test@test.com',
                password: 'test123'
            });

            const response = await request(app).post("/users/login").send({
                email: 'test@test.com',
                password: 'test123'
            });
            expect(response.status).toBe(200);
        });

        it("Should return 400 if user doesnt exist", async () => {
            const response = await request(app).post("/users/login").send({
                email: 'test@test.com',
                password: 'test123'
            });
            expect(response.status).toBe(400);
        });

        it("Should return 400 if password is incorrect", async () => {
            await request(app).post("/users/signup").send({
                email: 'test@test.com',
                password: 'test123'
            });

            const response = await request(app).post("/users/login").send({
                email: 'test@test.com',
                password: 'wrong'
            });
            expect(response.status).toBe(400);
        });
     })
});