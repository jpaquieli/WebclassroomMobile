import { IPost } from '@/entities/models/postInterface';

export interface IFindPostByIdRepository {
    findById(id: number): Promise<IPost>;
  }