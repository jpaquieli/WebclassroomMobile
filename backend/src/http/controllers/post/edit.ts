import { makeEditPostUseCase } from '@/useCases/factory/makeCreateEditPostUseCase';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function edit(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    });
  
    const bodySchema = z.object({
      title: z.string().optional(),
      content: z.string().optional(),
    });
  
    const { id } = paramsSchema.parse(req.params);
    const data = bodySchema.parse(req.body);
  
    const editPostUseCase = makeEditPostUseCase();
    await editPostUseCase.handler(id, data);
  
    res.status(200).send(`Post de id ${id} editado.`);
  }