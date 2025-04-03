import { IUserPayload } from "../interfaces/IUserPayload";
import jwt from 'jsonwebtoken';
import { TOKENS } from "../tokens";

export const sign = (payload: IUserPayload): string => {
    return jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: "1h" })
}


export const verify = (token: string) : IUserPayload | null => {
  if(token.includes(TOKENS.Bearer))
    token = token.substring(TOKENS.Bearer.length + 1);
  try {
    return jwt.verify(token, process.env.JWT_KEY!) as IUserPayload;
  } catch (error) {
    console.error(error);
    return null
  }
}