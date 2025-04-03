import jwt from 'jsonwebtoken'

export const verify = (token: string) :  | null => {
    if(token.includes(TOKENS.Bearer))
      token = token.substring(TOKENS.Bearer.length + 1);
    try {
      return jwt.verify(token, process.env.JWT_KEY!) as IUserPayload;
    } catch (error) {
      console.error(error);
      return null
    }
  }