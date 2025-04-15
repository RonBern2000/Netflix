import { NextFunction, Response, Request } from "express";
import { JWT_KEY } from "../src/config/env";
import { TOKENS } from "../tokens";
import { BadRequestError, verify } from '@netflix-utils/shared';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const { path } = req;

    if (path.startsWith('/api/v1/movies/popular') || path.startsWith('/api/v1/users/')){
        return next();
    }

    const accessToken  = req.headers['authorization'];
    const refreshToken = req.cookies[TOKENS.token] || req.cookies[TOKENS.tempToken];
    
    if (!accessToken  && !refreshToken) {
        res.status(401).json({message: 'Access Denied.'});// if he does not have both tokens, when we get here twice the user gets logged out
        return;
    }

    try {
        const decoded = verify(accessToken!, JWT_KEY!); // if the user has accessToken => can proceed
        if(!decoded)
            throw new BadRequestError('Invalid access token'); // gets us to the catch
        req.headers['x-user-id'] = decoded.id;
        return next();
    } catch (error) { // missing accessToken
        if (!refreshToken) {
            res.status(401).send('Access Denied.');
            return;
        }
        try { // missing access token But have refreshToken
            if (req.originalUrl.includes('/refresh')) {// case: the front's refresh api call when the user does have the refresh token. The users service checks if the token itself is a valid one
                return next();
            }
            res.status(401).send('Access Denied.'); // case: the user might get here in the first call so we shall make him get to the if above
            return;
        } catch (error) {
            res.status(400).send('Invalid Token.');
            return;
        }
    }
}