import { makeFindPostByIdUseCase } from '@/useCases/factory/makeFindPostByIdUseCase';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function findById(req: Request, res: Response) {
    const registerParamsSchema = z.object({
        id: z.coerce.number(),
    });

    const { id } = registerParamsSchema.parse(req.params);

    const findPostById = makeFindPostByIdUseCase();

    const post = await findPostById.handler(id);

    res.status(200).send(post);

}