import { NextFunction, Request, Response } from "express";
import {CustomError} from '../errors/custom-error';

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction): void => {
    if(error instanceof CustomError){
        const { statusCode, message} = error;
        res.status(statusCode).json({message});
        return;
    }
    const message = error instanceof Error ? error.message : 'Internal server Error!';
    res.status(500).json({ message });
}