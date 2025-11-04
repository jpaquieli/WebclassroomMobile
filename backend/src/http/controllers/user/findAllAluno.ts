import { makeFindAllAlunoUseCase } from '@/useCases/factory/makeFindAllAlunoUseCase';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function findAllAluno(req: Request, res: Response) {
    const registerQuerySchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
    });

    const { page, limit } = registerQuerySchema.parse(req.query);

    const findAllAlunoUseCase = makeFindAllAlunoUseCase();

    const aluno = await findAllAlunoUseCase.handler(page, limit);

    res.status(200).send(aluno);
}