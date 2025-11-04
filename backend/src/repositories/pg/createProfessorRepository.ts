import { database } from '@/lib/pg/db';
import { ICreateProfessorRepository } from '../interface/createProfessorRepositoryInterface';
import { IUser } from '@/entities/models/userInterface';

export class CreateProfessorRepository implements ICreateProfessorRepository {
public async create({
    username,
    password,
  }: IUser): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query<IUser>(
      'INSERT INTO "users" (username, password, role) VALUES ($1, $2, \'professor\') RETURNING *',
      [username, password],
    );

    return result?.rows[0];
  }
}