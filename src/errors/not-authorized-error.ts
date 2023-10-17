import { CustomError } from './custom-error';


/** 
 * Error made for the requireAuth middleware, can be called for other purposes.
 */
export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
