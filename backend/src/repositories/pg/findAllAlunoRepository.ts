import { database } from '@/lib/pg/db';
import { IUser } from '@/entities/models/userInterface';
import { IFindAllAlunoRepository } from '../interface/findAllAlunoRepositoryInterface';

export class FindAllAlunoRepository implements IFindAllAlunoRepository {
    async findAll(page: number, limit: number): Promise<IUser[]> {
      const offset = (page - 1) * limit;
  
      const result = await database.clientInstance?.query(
        'SELECT id, username FROM users WHERE role = \'aluno\' ORDER BY id LIMIT $1 OFFSET $2',
        [limit, offset]
      );
  
      return result?.rows || [];
    }
  }