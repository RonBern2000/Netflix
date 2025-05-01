import request from 'supertest';
import { app } from '../../app';
import casual from 'casual';
import { User } from '../../models/user-sql-entity';

describe("Tests for USER LIKE CONTROLLER", () => {

    describe("add", () => {
        it("Should return 201 if movie added to my list successfully", async () => {
            // await request(app).post("/users/signup").send({
            //     email: 'test@test.com',
            //     password: 'test123'
            // });

            // await request(app).post("/users/login").send({
            //     email: 'test@test.com',
            //     password: 'test123'
            // });


            const user = {
                id: casual.uuid,
                email: casual.email,
                password: casual.password,
                active: true
            };

            await User.create(user);

            const response = await request(app).post("/usersLike/add").send({
                genre_ids: [454],
                id: 465632,
                key: "string",
                overview: "string",
                popularity: 465,
                poster_path: "string",
                backdrop_path: "string",
                release_date: "string",
                title: "string",
                vote_average: 435,
                vote_count: 543,
            }).set("x-user-id", user.id);

            expect(response.status).toBe(201);
        });
    });

    describe("remove", () => {
        it("Should return 200 if movie removed from my list successfully", async () => {
            const user = {
                id: casual.uuid,
                email: casual.email,
                password: casual.password,
                active: true
            };

            await User.create(user);

            await request(app).post("/usersLike/add").send({
                genre_ids: [454],
                id: 465632,
                key: "string",
                overview: "string",
                popularity: 465,
                poster_path: "string",
                backdrop_path: "string",
                release_date: "string",
                title: "string",
                vote_average: 435,
                vote_count: 543,
            }).set("x-user-id", user.id);

            const response = await request(app).post("/usersLike/remove").send({
                genre_ids: [454],
                id: 465632,
                key: "string",
                overview: "string",
                popularity: 465,
                poster_path: "string",
                backdrop_path: "string",
                release_date: "string",
                title: "string",
                vote_average: 435,
                vote_count: 543,
            }).set("x-user-id", user.id);

            expect(response.status).toBe(200);
        });
    });

    describe("getMyList", () => {
        it("Should return 200 if returned the list successfully", async () => {
            const user = {
                id: casual.uuid,
                email: casual.email,
                password: casual.password,
                active: true
            };

            await User.create(user);

            const response = await request(app).get("/usersLike/getMyList").set("x-user-id", user.id);

            expect(response.status).toBe(200);
        });

        it("Should return 200 if list has 2 movies", async () => {
            const user = {
                id: casual.uuid,
                email: casual.email,
                password: casual.password,
                active: true
            };

            await User.create(user);

            await request(app).post("/usersLike/add").send({
                genre_ids: [8574],
                id: 857257,
                key: "stringf",
                overview: "stringf",
                popularity: 46543,
                poster_path: "stringf",
                backdrop_path: "stringf",
                release_date: "stringf",
                title: "stringf",
                vote_average: 44335,
                vote_count: 54233,
            }).set("x-user-id", user.id);

            await request(app).post("/usersLike/add").send({
                genre_ids: [454],
                id: 465632,
                key: "string",
                overview: "string",
                popularity: 465,
                poster_path: "string",
                backdrop_path: "string",
                release_date: "string",
                title: "string",
                vote_average: 435,
                vote_count: 543,
            }).set("x-user-id", user.id);

            const response = await request(app).get("/usersLike/getMyList").set("x-user-id", user.id);

            expect(Object.keys(response.body.myList).length).toBe(2);
        });
    });
});