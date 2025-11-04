import { IUser, UserRole } from '../models/userInterface';

export class User implements IUser {
  id?: number;
  username: string;
  password: string;
  role: UserRole;

  constructor(username: string, password: string, role: UserRole) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}