import { IUser } from '@/entities/models/userInterface';

export interface ICreateProfessorRepository {
  create(user: IUser): Promise<IUser | undefined>
}