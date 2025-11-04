import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/env';

interface JwtPayload {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
    role: string;
  };
}

export function validateRole(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (decoded.role !== 'professor') {
      res.status(403).json({ error: 'Acesso restrito a professores' });
      return;
    }

    (req as AuthenticatedRequest).user = {
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' });
    return;
  }
}