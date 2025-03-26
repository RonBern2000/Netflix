"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.generateCustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
const generateCustomError = (error, statusCode) => {
    if (error instanceof Error) {
        return new CustomError(error.message, statusCode);
    }
    return new CustomError("Internal server Error!", 500);
};
exports.generateCustomError = generateCustomError;
const errorHandler = (error, req, res, next) => {
    if (error instanceof CustomError) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ message });
    }
    res.status(500).json({ message: error.message || "Internal server Error!" });
};
exports.errorHandler = errorHandler;
