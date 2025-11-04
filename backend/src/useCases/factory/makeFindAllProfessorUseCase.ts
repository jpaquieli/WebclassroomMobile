import { FindAllProfessorRepository } from '@/repositories/pg/findAllProfessorRepository';
import { FindAllProfessorUseCase } from '../findAllProfessor';

export function makeFindAllProfessorUseCase() {
  const findAllProfessorRepository = new FindAllProfessorRepository();
  const findAllPostUseCase = new FindAllProfessorUseCase(findAllProfessorRepository);
  return findAllPostUseCase;
}