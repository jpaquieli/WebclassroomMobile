import { IUser } from '@/entities/models/userInterface';

export interface ICreateAlunoRepository {
  create(user: IUser): Promise<IUser | undefined>
}