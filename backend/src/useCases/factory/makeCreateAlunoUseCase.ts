import { CreateAlunoRepository } from '@/repositories/pg/createAlunoRepository';
import { FindUserByUsernameRepository } from '@/repositories/pg/findUserByUsernameRepository';
import { CreateAlunoUseCase } from '../createAluno';

export function makeCreateAlunoUseCase() {
  const createAlunoRepository = new CreateAlunoRepository();
  const findUserByUsernameRepository = new FindUserByUsernameRepository();

  const createAlunoUseCase = new CreateAlunoUseCase(
    createAlunoRepository,
    findUserByUsernameRepository
  );

  return createAlunoUseCase;
}