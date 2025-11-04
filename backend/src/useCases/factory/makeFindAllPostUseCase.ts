import { FindAllPostRepository } from '@/repositories/pg/findAllPostRepository';
import { FindAllPostUseCase } from '../findAllPost';

export function makeFindAllPostUseCase() {
  const findAllPostRepository = new FindAllPostRepository();
  const findAllPostUseCase = new FindAllPostUseCase(findAllPostRepository);
  return findAllPostUseCase;
}