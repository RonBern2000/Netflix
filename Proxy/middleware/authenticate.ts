import { NextFunction, Response, Request } from "express";
import { JWT_KEY } from "../src/config/env";
import { TOKENS } from "../tokens";
import { BadRequestError, verify } from '@netflix-utils/shared'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const accessToken  = req.headers['authorization'];
    const refreshToken = req.cookies[TOKENS.token] || req.cookies[TOKENS.tempToken];
    
    if (!accessToken  && !refreshToken) {
        return res.status(401).json({message: 'Access Denied.'});// if he does not have both tokens, when we get here twice the user gets logged out
    }

    try {
        const decoded = verify(accessToken!, JWT_KEY!); // if the user has accessToken => can proceed
        if(!decoded)
            throw new BadRequestError('Invalid access token'); // gets us to the catch
        // req.user = decoded.user;
        return next();
    } catch (error) { // missing accessToken
        if (!refreshToken) {
            return res.status(401).send('Access Denied.');
        }
        try {
            if (req.originalUrl.includes('/refresh')) {// This will be the the api call for /users/api/v1/users/refresh because of the front
                return next();
            } 
        } catch (error) {
            return res.status(400).send('Invalid Token.');
        }
    }
}
 // const decoded = verify(refreshToken, JWT_KEY!);
// if(!decoded)
//     throw new BadRequestError('Invalid token');
// const newAccessToken = jwt.sign({ user: decoded }, JWT_KEY!, { expiresIn: '1h' });

// if(decoded.active)
//     res.cookie(TOKENS.token, refreshToken, { httpOnly: true, sameSite: 'strict' });
// else
//     res.cookie(TOKENS.tempToken, refreshToken, { httpOnly: true, sameSite: 'strict' });

// res.header('authorization', accessToken);
// return res.status(200).json({ accessToken: newAccessToken });