import { User } from '@/entities/interface/userEntity';
import { ICreateProfessorRepository } from '@/repositories/interface/createProfessorRepositoryInterface';
import { IFindUserByUsernameRepository } from '@/repositories/interface/findUserByUsername';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

export class CreateProfessorUseCase {
  constructor(private createProfessorRepository: ICreateProfessorRepository,
    private findUserByUsernameRepository: IFindUserByUsernameRepository
  ) {}

  async handler(user: User): Promise<User | undefined> {
    const existingUser = await this.findUserByUsernameRepository.findByUsername(user.username);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    return this.createProfessorRepository.create(user);
  }
}