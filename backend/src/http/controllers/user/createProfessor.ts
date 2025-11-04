import { UserRole } from '@/entities/models/userInterface';
import { makeCreateProfessorUseCase } from '@/useCases/factory/makeCreateProfessorUseCase';
import { hash } from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createProfessor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const registerBodySchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const parseResult = registerBodySchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: 'Erro de validação',
        issues: parseResult.error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      });
      return;
    }

    const { username, password } = parseResult.data;

    const role: UserRole = 'professor';

    const hashedPassword = await hash(password, 8);

    const createProfessorUseCase = makeCreateProfessorUseCase();

    const user = await createProfessorUseCase.handler({
      username,
      password: hashedPassword,
      role,
    });

    res.status(200).send(`Usuário ${user?.username} criado com sucesso.`);
  } catch (error) {
    next(error);
  }
};