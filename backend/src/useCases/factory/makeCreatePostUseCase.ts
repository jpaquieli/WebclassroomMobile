import { CreatePostRepository } from '@/repositories/pg/createPostRepository';
import { CreatePostUseCase } from '../createPost';

export function makeCreatePostUseCase() {
    const createPostRepository = new CreatePostRepository();
    const createPostUseCase = new CreatePostUseCase(createPostRepository);
    return createPostUseCase;
 }