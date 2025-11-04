import { IPost } from '@/entities/models/postInterface';

export interface ICreatePostRepository {
    create(post: IPost): Promise<IPost>;
}