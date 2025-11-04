export type UserRole = 'aluno' | 'professor';

export interface IUser {
  id?: number;
  username: string;
  password: string;
  role: UserRole;
}