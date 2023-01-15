import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/jwt';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const jwt = new JWT();
  const { code, response } = jwt.verifyToken(authorization as string);
  if (code) {
    return res.status(code).json({ message: response });
  }
  req.body.user = response;
  next();
};
