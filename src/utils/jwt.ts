import jwt from 'jsonwebtoken';
import { JsonWebToken } from '../constants/jwtConstants';
// import fs from 'fs';
import { CustomError } from './error';
export class JWT {
    generateToken = (data: { id: number }): string => {
        return jwt.sign(data, JsonWebToken.jwtSecret, {
            expiresIn: JsonWebToken.TOKEN_EXPIRED,
        });
    };
    verifyToken = (token: string) => {
        try {
            const decode = jwt.verify(token, JsonWebToken.jwtSecret);
            return decode;
        } catch (error: any) {
            throw new CustomError(403, error.message);
        }
    };
}
