import { makeDeletePostUseCase } from '@/useCases/factory/makeDeletePostUseCase';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function deletePost(req: Request, res: Response,) {
    const registerParamsSchema = z.object({
      id: z.coerce.number(),
    });
  
    const { id } = registerParamsSchema.parse(req.params);
  
    const deletePostUseCase = makeDeletePostUseCase();
  
    await deletePostUseCase.handler(id);
  
    res.status(200).send(`Post de id ${id} deletado.`);
  }