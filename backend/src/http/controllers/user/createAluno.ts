import { UserRole } from '@/entities/models/userInterface';
import { makeCreateAlunoUseCase } from '@/useCases/factory/makeCreateAlunoUseCase';
import { hash } from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createAluno = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    const role: UserRole = 'aluno';

    const hashedPassword = await hash(password, 8);

    const createAlunoUseCase = makeCreateAlunoUseCase();

    const user = await createAlunoUseCase.handler({
      username,
      password: hashedPassword,
      role,
    });

    res.status(200).send(`Usuário ${user?.username} criado com sucesso.`);
  } catch (error) {
    next(error);
  }
};