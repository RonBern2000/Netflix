import { NextFunction, Request, Response } from "express";

class CustomError extends Error{
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}

export const generateCustomError = (error: unknown, statusCode: number): CustomError => {
    if(error instanceof Error){
        return new CustomError(error.message, statusCode);
    }
    return new CustomError("Internal server Error!", 500);
}

export const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): void => {
    if(error instanceof CustomError){
        const { statusCode, message} = error;
        res.status(statusCode).json({message});
    }
    res.status(500).json({message: error.message || "Internal server Error!"});
}