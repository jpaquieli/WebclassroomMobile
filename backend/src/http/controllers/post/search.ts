import { makeSearchPostUseCase } from '@/useCases/factory/makeSearchPostRepository';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function search(req: Request, res: Response) {
    const registerQuerySchema = z.object({
        keyWord: z.string(),
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
    });

    const { keyWord, page, limit } = registerQuerySchema.parse(req.query);

    const searchPostUseCase = makeSearchPostUseCase();

    const posts = await searchPostUseCase.handler(keyWord, page, limit);

    res.status(200).send(posts);
}