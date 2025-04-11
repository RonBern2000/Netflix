import { NextFunction, Request, Response } from 'express';
import { JWT_KEY } from '../src/config/env';
import { BadRequestError } from '@netflix-utils/shared';
import { verify } from '@netflix-utils/shared';
// declare global {
//   namespace Express {
//     interface Request {
//       userId?: string;
//     }
//   }
// }

export const authenticatePayment = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.tempToken;

        if (!token)
            throw new BadRequestError('No token provided');

        const decoded = verify(token, JWT_KEY!);

        if (!decoded || !decoded.id)
            throw new BadRequestError('Invalid token');

        req.headers['x-user-id'] = decoded.id;
        return next();
        } catch (error) {
            return next(error);
        }
}