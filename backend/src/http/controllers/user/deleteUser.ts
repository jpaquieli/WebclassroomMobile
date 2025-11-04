import { makeDeleteUserUseCase } from '@/useCases/factory/makeDeleteUserUseCase';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function deleteUser(req: Request, res: Response,) {
    const registerParamsSchema = z.object({
      id: z.coerce.number(),
    });
  
    const { id } = registerParamsSchema.parse(req.params);
  
    const deleteUserUseCase = makeDeleteUserUseCase();
  
    await deleteUserUseCase.handler(id);
  
    res.status(200).send(`User de id ${id} deletado.`);
  }