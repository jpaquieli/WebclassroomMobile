import { makeFindAllPostUseCase } from '@/useCases/factory/makeFindAllPostUseCase';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function findAll(req: Request, res: Response) {
    const registerQuerySchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
    });

    const { page, limit } = registerQuerySchema.parse(req.query);

    const findAllPostUseCase = makeFindAllPostUseCase();

    const posts = await findAllPostUseCase.handler(page, limit);

    res.status(200).send(posts);
}