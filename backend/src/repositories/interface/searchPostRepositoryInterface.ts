import { IPost } from '@/entities/models/postInterface';

export interface ISearchPostRepository {
    search(keyWord: string, page: number, limit: number): Promise<IPost[]>;
  }