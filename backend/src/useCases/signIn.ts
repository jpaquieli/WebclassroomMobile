import { IFindUserByUsernameRepository } from '@/repositories/interface/findUserByUsername';
import { InvalidCredentialsError } from './errors/invalidCredentialsError';

export class SigninUseCase {
  constructor(private readonly findUserByUsernameRepository: IFindUserByUsernameRepository) {}

  async handler(username: string) {
    const user = await this.findUserByUsernameRepository.findByUsername(username);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}