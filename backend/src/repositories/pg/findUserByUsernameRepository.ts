import { database } from '@/lib/pg/db';
import { IFindUserByUsernameRepository } from '../interface/findUserByUsername';
import { IUser } from '@/entities/models/userInterface';

export class FindUserByUsernameRepository implements IFindUserByUsernameRepository {
    async findByUsername(username: string): Promise<IUser | undefined> {
        const result = await database.clientInstance?.query<IUser>(
          'SELECT * FROM "users" WHERE username = $1',
          [username],
        );
    
        return result?.rows[0];
      }
}