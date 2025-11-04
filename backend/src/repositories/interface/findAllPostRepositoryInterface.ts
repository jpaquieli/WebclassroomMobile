import { IPost } from '@/entities/models/postInterface';

export interface IFindAllPostRepository {
    findAll(page: number, limit: number): Promise<IPost[]>;
  }