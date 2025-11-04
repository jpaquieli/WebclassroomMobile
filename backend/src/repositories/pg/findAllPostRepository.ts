import { database } from '@/lib/pg/db';
import { IPost } from '@/entities/models/postInterface';
import { IFindAllPostRepository } from '../interface/findAllPostRepositoryInterface';

export class FindAllPostRepository implements IFindAllPostRepository {
    async findAll(page: number, limit: number): Promise<IPost[]> {
      const offset = (page - 1) * limit;
  
      const result = await database.clientInstance?.query(
        'SELECT * FROM post ORDER BY id LIMIT $1 OFFSET $2',
        [limit, offset]
      );
  
      return result?.rows || [];
    }
  }