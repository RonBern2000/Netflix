import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JWT_KEY } from '../src/config/env';
import { BadRequestError } from '@netflix-utils/shared';

export const Authenticate = (req: Request, res: Response, next: NextFunction) => {
    const { path, header } = req;

    //TODO: check that Bearer is inside the token
    if (path.startsWith('/api/v1/movies/popular')){
        return next();
    }
    try {
        const token = header('token');

        if (token){
        const verified = jwt.verify(token, JWT_KEY!); //TODO: move to utils
        if (verified) {
            return next()
        } else {
            throw new BadRequestError('unautherized');
        }
    }
    } catch (error) {
        return next(error);
    }
}