import { FindUserByUsernameRepository } from '@/repositories/pg/findUserByUsernameRepository';
import { SigninUseCase } from '../signIn';

export function makeSigninUseCase() {
  const findUserByUsernameRepository = new FindUserByUsernameRepository();
  const signinUseCase = new SigninUseCase(findUserByUsernameRepository);
  return signinUseCase;
}