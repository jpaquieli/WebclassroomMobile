import express from 'express';
import { validateJwt } from './http/middlewares/jwtValidate';
import userRouter from './http/controllers/user/routes';
import postRouter from './http/controllers/post/routes';

export const app = express();
app.use(express.json());

app.use(validateJwt);

app.use('/v1', userRouter);
app.use('/v1', postRouter);