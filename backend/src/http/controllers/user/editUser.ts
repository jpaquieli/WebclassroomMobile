import { makeEditUserUseCase } from '@/useCases/factory/makeEditUserUseCase';
import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { z } from 'zod';

export async function editUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    });

    const bodySchema = z.object({
      username: z.string().optional(),
      password: z.string().optional(),
    });

    const { id } = paramsSchema.parse(req.params);
    const { username, password } = bodySchema.parse(req.body);

    const data: { username?: string; password?: string } = {};

    if (username) {
      data.username = username;
    }

    if (password) {
      data.password = await hash(password, 8);
    }

    const editUserUseCase = makeEditUserUseCase();
    const updatedUser = await editUserUseCase.handler(id, data);

    if (!updatedUser) {
      res.status(404).json({ message: 'Usuário não encontrado.' });
      return;
    }

    res.status(200).json({
      message: `Usuário com id ${id} editado com sucesso.`
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}