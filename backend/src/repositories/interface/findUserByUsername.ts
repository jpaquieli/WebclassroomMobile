import { IUser } from '@/entities/models/userInterface';

export interface IFindUserByUsernameRepository {
  findByUsername(username: string): Promise<IUser | undefined>
}