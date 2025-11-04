import { database } from '@/lib/pg/db';
import { IPost } from '@/entities/models/postInterface';
import { IFindPostByIdRepository } from '../interface/findPostByIdRepositoryInterface';

export class FindPostByIdRepository implements IFindPostByIdRepository {
    async findById(id: number): Promise<IPost> {
        const result = await database.clientInstance?.query(
            'SELECT * FROM post WHERE id = $1',
            [id]
        );

        return result?.rows[0];
    }
    
}