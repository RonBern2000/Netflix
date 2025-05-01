import { IUserPayload } from "../interfaces/IUserPayload";
import jwt from 'jsonwebtoken';

export const signAccessToken = (payload: IUserPayload): string => {
    return jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: "15m" });
}

export const signRefreshToken = (payload: IUserPayload): string => {
    return jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: "1d" });
}