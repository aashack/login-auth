import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';


/**
 * Middleware that moves the error check in the index.ts file into a middleware function
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};
