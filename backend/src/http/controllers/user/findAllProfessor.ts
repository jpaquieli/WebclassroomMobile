import { makeFindAllProfessorUseCase } from '@/useCases/factory/makeFindAllProfessorUseCase';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function findAllProfessor(req: Request, res: Response) {
    const registerQuerySchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
    });

    const { page, limit } = registerQuerySchema.parse(req.query);

    const findAllProfessorUseCase = makeFindAllProfessorUseCase();

    const professor = await findAllProfessorUseCase.handler(page, limit);

    res.status(200).send(professor);
}