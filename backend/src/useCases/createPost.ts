import { Post } from '@/entities/interface/postEntity';
import { IPost } from '@/entities/models/postInterface';
import { ICreatePostRepository } from '@/repositories/interface/createPostRepositoryInterface';

export class CreatePostUseCase {
    constructor(private createPostRepository: ICreatePostRepository) {}

    async handler(post: Post): Promise<IPost> {
        return this.createPostRepository.create(post);
    }
}