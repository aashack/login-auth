import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import UserController from '../controller/user-controller'

const router = express.Router();

router.post(
  '/v1/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user = await UserController.signUp(email, password)

        // Store it on session object
    req.session = {
          jwt: user.token
    };


    res.status(201).send(user);
  }
);

export { router as signupRouter };
