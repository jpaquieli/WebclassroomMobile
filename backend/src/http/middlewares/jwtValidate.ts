import { Request, Response, NextFunction } from 'express';
import { env } from '@/env';
import jwt from 'jsonwebtoken';

export function validateJwt(req: Request, res: Response, next: NextFunction): void {
  try {
    const routeFreeList = ['POST-/v1/user/professor', 'POST-/v1/user/aluno', 'POST-/v1/user/signin'];
    const validateRoute = `${req.method}-${req.path}`;

    if (routeFreeList.includes(validateRoute)) {
      next();
      return;
    }

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    res.status(401).send({ message: 'Unauthorized' });
  }
}