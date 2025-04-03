import { NextFunction, Request, Response } from 'express';
import { JWT_KEY } from '../src/config/env';
import { BadRequestError } from '@netflix-utils/shared';
import { verify } from '@netflix-utils/shared'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const { path, header } = req;

    if (path.startsWith('/api/v1/movies/popular')){
        return next();
    }
    try {
        const token = header('token');

        if (token){
        const verified = verify(token, JWT_KEY!);
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