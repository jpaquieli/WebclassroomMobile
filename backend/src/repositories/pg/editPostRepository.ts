import { database } from '@/lib/pg/db';
import { IEditRepository } from '../interface/editPostRepositoryInterface';

export class EditPostRepository implements IEditRepository {
  async edit(id: number, data: { title?: string; content?: string }): Promise<boolean> {
    const result = await database.clientInstance?.query(
        'UPDATE post SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3',
        [data.title ?? null, data.content ?? null, id]
      );
    return result?.rowCount === 1;
  }
}