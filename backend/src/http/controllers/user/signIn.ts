import { env } from '@/env';
import { InvalidCredentialsError } from '@/useCases/errors/invalidCredentialsError';
import { makeSigninUseCase } from '@/useCases/factory/makeSignInUseCase';
import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export async function signin(req: Request, res: Response) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { username, password } = registerBodySchema.parse(req.body);


  const signinUseCase = makeSigninUseCase();

  const user = await signinUseCase.handler(username);

  const role = user.role;

  const doestPasswordMatch = await compare(password, user.password);

  if (!doestPasswordMatch) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign({ username, role }, env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
}