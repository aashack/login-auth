import _ from "lodash";
import config from 'config';
import { BadRequestError } from "../errors/bad-request-error";
import { redisStore } from "../models/redis";
import jwt from 'jsonwebtoken';
import { Password } from "../helper/password";
import { RedisCommandArgument } from "@redis/client/dist/lib/commands";

class UserController {

  /**
   * User Sign up
   * @param email - String - a pre-validated email
   * @param password - String - a pre-validated password
   * @returns - Object - users email and token
   */
    async signUp(email: String, password: string) {
        const redis = await redisStore()
        const existingUserPass = await redis.get(email as RedisCommandArgument);

        if (existingUserPass) {
            throw new BadRequestError('Email in use');
        }

        const hashed = await Password.toHash(password);
        await redis.set(email as RedisCommandArgument, hashed);
        const token:any = config.get('token');
        // Generate JWT
        const userJwt = jwt.sign(
            {
            email: email
            },
            token.JWT_KEY!,
            {
              expiresIn: '1h'
            }
        );
        
        return { User: email, token: userJwt };
    }


  /**
   * User sign in
   * @param email - String - a pre-validated email
   * @param password - String - a pre-validated password
   * @returns - Object - users email and token
   */
  async signIn(email: String, password: string) {
    const redis = await redisStore()
    const existingUserPass = await redis.get(email as RedisCommandArgument);
    if (!existingUserPass) {
      throw new BadRequestError('Invalid credentials');
    }
    const passwordsMatch = await Password.compare(
      existingUserPass,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }
    const token:any = config.get('token');
    
    // Generate JWT
    const userJwt = jwt.sign(
      {
        email: email
      },
      token.JWT_KEY!
    );

    return { User: email, token: userJwt };
  }
}
const userController = new UserController();

export default userController;