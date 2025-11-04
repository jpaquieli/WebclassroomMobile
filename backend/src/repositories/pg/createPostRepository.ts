import { database } from '@/lib/pg/db';
import { IPost } from '@/entities/models/postInterface';
import { ICreatePostRepository } from '../interface/createPostRepositoryInterface';

export class CreatePostRepository implements ICreatePostRepository {
    async create ({    
        title,
        content,
        author,
    }: IPost): Promise<IPost> {
        const result = await database.clientInstance?.query(
           `INSERT INTO post (title, content, dateTime, author)
            VALUES ($1, $2, CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo', $3)
            RETURNING *`,
            [title, content, author] 
        );

        return result?.rows[0];
    }
}