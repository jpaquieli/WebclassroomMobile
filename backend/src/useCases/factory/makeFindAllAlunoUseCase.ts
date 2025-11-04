import { FindAllAlunoRepository } from '@/repositories/pg/findAllAlunoRepository';
import { FindAllAlunoUseCase } from '../findAllAluno';

export function makeFindAllAlunoUseCase() {
  const findAllAlunoRepository = new FindAllAlunoRepository();
  const findAllPostUseCase = new FindAllAlunoUseCase(findAllAlunoRepository);
  return findAllPostUseCase;
}