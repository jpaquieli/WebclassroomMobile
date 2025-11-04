import { User } from '@/entities/interface/userEntity';
import { ICreateAlunoRepository } from '@/repositories/interface/createAlunoRepositoryInterface';
import { IFindUserByUsernameRepository } from '@/repositories/interface/findUserByUsername';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

export class CreateAlunoUseCase {
  constructor(private createAlunoRepository: ICreateAlunoRepository,
    private findUserByUsernameRepository: IFindUserByUsernameRepository
  ) {}

  async handler(user: User): Promise<User | undefined> {
    const existingUser = await this.findUserByUsernameRepository.findByUsername(user.username);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    return this.createAlunoRepository.create(user);
  }
}