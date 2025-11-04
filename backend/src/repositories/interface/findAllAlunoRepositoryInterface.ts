import { IUser } from '@/entities/models/userInterface';

export interface IFindAllAlunoRepository {
    findAll(page: number, limit: number): Promise<IUser[]>;
  }