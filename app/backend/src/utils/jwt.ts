import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/ILogin';

export default class JWT {
  generationToken = (data: IUser) => {
    const user = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(data, user, { algorithm: 'HS256', expiresIn: '1d' });
    return token;
  };

  verifyToken = (token: string): jwt.JwtPayload => {
    if (!token) {
      return { code: 401, response: 'Token must be a valid token' };
    }
    try {
      const userToken = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
      return { code: null, response: userToken };
    } catch (error) {
      return { code: 401, response: 'Token must be a valid token' };
    }
  };
}
