import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

import UserController from '../controller/user-controller'

const router = express.Router();

router.post(
  '/v1/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user = await UserController.signIn(email, password)
    // Store it on session object 
    req.session = {
      jwt: user.token
    };

    res.status(200).send(user);
  }
);

export { router as signinRouter };
