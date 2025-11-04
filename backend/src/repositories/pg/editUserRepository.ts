import { database } from '@/lib/pg/db';
import { IUser } from '@/entities/models/userInterface';
import { IEditUserRepository } from '../interface/editUserRepositoryInterface';

export class EditUserRepository implements IEditUserRepository {
  public async edit(id: number, data: { username?: string; password?: string }): Promise<boolean> {
    const { username, password } = data;
    const result = await database.clientInstance?.query<IUser>(
      `
      UPDATE users
      SET 
        username = COALESCE($1, username),
        password = COALESCE($2, password)
      WHERE id = $3
      RETURNING *;
      `,
      [username ?? null, password ?? null, id]
    );
    return result?.rowCount === 1;
  }
}