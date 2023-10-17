import { Request, Response, NextFunction } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';

interface UserPayload {
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
};

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  };

  try {
    const token:any = config.get('token');
    const payload = jwt.verify(
      req.session.jwt,
      token.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    // do nothing just continue, it will error in the route.
  };

  next();
};
