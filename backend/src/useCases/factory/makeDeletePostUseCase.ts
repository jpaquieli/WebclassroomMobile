import { DeletePostRepository } from '@/repositories/pg/deletePostRepository';
import { DeletePostUseCase } from '../deletePost';

export function makeDeletePostUseCase() {
    const deletePostRepository = new DeletePostRepository();
    const deletePostUseCase = new DeletePostUseCase(deletePostRepository);
    return deletePostUseCase;
 }