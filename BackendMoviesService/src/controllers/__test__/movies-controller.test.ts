process.env.JWT_KEY = "ef85748g9wfjmrujg";
process.env.NODE_ENV = "test";
process.env.REDIS_URI = 'localhost';
process.env.REDIS_PORT = '6666';

import request from 'supertest';
import { app } from '../../app';

describe("Tests for MOVIES CONTROLLER", () => {

    describe("searchMoviesByTitle", () => {
        it("Should return 200 if searched successfully", async () => {
            const response = await request(app).get("/movies/search").query({ 
                title: 'fast'
            });

            expect(response.status).toBe(200);
        });
        
        it("Should return 400 if title did not set", async () => {
            const response = await request(app).get("/movies/search");
    
            expect(response.status).toBe(400);
        });
    });

    describe("getPopularMovies", () => {
        it("Should return 200 if popular movies arrived", async () => {
            const response = await request(app).get("/movies/popular");
    
            expect(response.status).toBe(200);
        });
    });
    
    describe("getAllMoviesByGenres", () => {
        it("Should return 200 if all movies arrived", async () => {
            const response = await request(app).get("/movies/allMoviesByGenres");
    
            expect(response.status).toBe(200);
        });
    });
    
    describe("getGenres", () => {
        it("Should return 200 if all genres arrived", async () => {
            const response = await request(app).get("/movies/getGenres");
    
            expect(response.status).toBe(200);
        });
    });
});
// describe("Tests for MOVIES CONTROLLER", () => {
//     describe("getGenres", () => {
//         it("Should return 200 if all genres arrived", async () => {
//             const response = 1;

//             expect(response).toBe(1);
//         });
//     });
// });