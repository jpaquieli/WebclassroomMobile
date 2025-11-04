import { database } from '@/lib/pg/db';
import { IDeleteUserRepository } from '../interface/deleteUserRepositoryInterface';

export class DeleteUserRepository implements IDeleteUserRepository {
    async delete(id: number): Promise<boolean> {
        const result = await database.clientInstance?.query(
            'DELETE FROM users WHERE id = $1',
            [id]
        );
        return (result?.rowCount ?? 0) > 0;
    }
}