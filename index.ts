import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import config from 'config';

import { currentUserRouter } from './src/routes/current-user';
import { signinRouter } from './src/routes/signin';
import { signoutRouter } from './src/routes/signout';
import { signupRouter } from './src/routes/signup';
import { errorHandler } from './src/middlewares/error-handler';
import { NotFoundError } from './src/errors/not-found-error';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(
  cookieSession({
    name: 'session',
    signed: false,
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {     
  if(!config.has('token')) {
    console.log('config.has');
    const token:any = config.get('token');
    throw new Error('JWT_KEY must be defined');
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
  
};

start();