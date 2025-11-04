import { SearchPostRepository } from '@/repositories/pg/searchPostRepository';
import { SearchPostUseCase } from '../searchPost';

export function makeSearchPostUseCase() {
  const searchPostRepository = new SearchPostRepository();
  const searchPostUseCase = new SearchPostUseCase(searchPostRepository);
  return searchPostUseCase;
}