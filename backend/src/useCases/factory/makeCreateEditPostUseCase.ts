import { EditPostRepository } from '@/repositories/pg/editPostRepository';
import { EditPostUseCase } from '../editPost';

export function makeEditPostUseCase() {
    const editPostRepository = new EditPostRepository();
    const editPostUseCase = new EditPostUseCase(editPostRepository);
    return editPostUseCase;
 }