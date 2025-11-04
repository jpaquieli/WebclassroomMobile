import { FindPostByIdRepository } from '@/repositories/pg/findPostByIdRepository';
import { FindPostByIdUseCase } from '../findPostById';

export function makeFindPostByIdUseCase() {
    const findPostByIdRepository = new FindPostByIdRepository();
    const findPostByIdUseCase = new FindPostByIdUseCase(findPostByIdRepository);
    return findPostByIdUseCase;
  }