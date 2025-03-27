import { NextFunction, Request, Response } from "express";
import {CustomError} from '../errors/custom-error';

export const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): void => {
    if(error instanceof CustomError){
        const { statusCode, message} = error;
        res.status(statusCode).json({message});
    }
    res.status(500).json({message: error.message || "Internal server Error!"});
}