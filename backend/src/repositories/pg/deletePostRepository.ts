import { database } from '@/lib/pg/db';
import { IDeletePostRepository } from '../interface/deletePostInterfaceRepository';

export class DeletePostRepository implements IDeletePostRepository {
    async delete(id: number): Promise<boolean> {
        const result = await database.clientInstance?.query(
            'DELETE FROM post WHERE id = $1',
            [id]
        );
        return (result?.rowCount ?? 0) > 0;
    }
}