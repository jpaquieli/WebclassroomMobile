import { database } from '@/lib/pg/db';
import { ICreateAlunoRepository } from '../interface/createAlunoRepositoryInterface';
import { IUser } from '@/entities/models/userInterface';

export class CreateAlunoRepository implements ICreateAlunoRepository {
public async create({
    username,
    password,
  }: IUser): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query<IUser>(
      'INSERT INTO "users" (username, password, role) VALUES ($1, $2, \'aluno\') RETURNING *',
      [username, password],
    );

    return result?.rows[0];
  }
}