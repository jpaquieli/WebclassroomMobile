import { IUser } from '@/entities/models/userInterface';

export interface IFindAllProfessorRepository {
    findAll(page: number, limit: number): Promise<IUser[]>;
  }