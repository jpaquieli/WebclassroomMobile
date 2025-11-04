import { CreateProfessorRepository } from '@/repositories/pg/createProfessorRepository';
import { FindUserByUsernameRepository } from '@/repositories/pg/findUserByUsernameRepository';
import { CreateProfessorUseCase } from '../createProfessor';

export function makeCreateProfessorUseCase() {
  const createProfessorRepository = new CreateProfessorRepository();
  const findUserByUsernameRepository = new FindUserByUsernameRepository();

  const createProfessorUseCase = new CreateProfessorUseCase(
    createProfessorRepository,
    findUserByUsernameRepository
  );

  return createProfessorUseCase;
}