import { NextFunction, Request, Response } from 'express';
import { JWT_KEY } from '../src/config/env';
import { BadRequestError } from '@netflix-utils/shared';
import { verify } from '@netflix-utils/shared'

export const authenticateMovies = (req: Request, res: Response, next: NextFunction) => {
    const { path } = req;

    if (path.startsWith('/api/v1/movies/popular')){
        return next();
    }

    try {
        const token = req.cookies.token;
        if (!token)
            throw new BadRequestError('No token provided');
        
        const decoded = verify(token, JWT_KEY!);

        if (!decoded)
            throw new BadRequestError('Invalid token');

        return next();
    } catch (error) {
        return next(error);
    }
}