beforeAll(async() => {
    process.env.JWT_KEY = "ef85748g9wfjmrujg";
    process.env.NODE_ENV = "test";
    process.env.REDIS_URI = 'localhost';
    process.env.REDIS_PORT = '6666';
});