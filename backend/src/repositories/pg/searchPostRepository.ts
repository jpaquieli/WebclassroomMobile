import { database } from '@/lib/pg/db';
import { IPost } from '@/entities/models/postInterface';
import { ISearchPostRepository } from '../interface/searchPostRepositoryInterface';

export class SearchPostRepository implements ISearchPostRepository {
    async search(keyWord: string, page: number, limit: number): Promise<IPost[]> {
      const offset = (page - 1) * limit;
      const keywordLike = `%${keyWord}%`;
  
      const result = await database.clientInstance?.query(
      'SELECT * FROM post WHERE title ILIKE $1 OR content ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3',
      [keywordLike, limit, offset]
      );
  
      return result?.rows || [];
    }
  }