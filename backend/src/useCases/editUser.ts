import { IEditUserRepository } from '@/repositories/interface/editUserRepositoryInterface';

export class EditUserUseCase {
  constructor(private editUserRepository: IEditUserRepository) {}

  public async handler(id: number, data: { username?: string; password?: string }): Promise<boolean> {
    const updatedUser = await this.editUserRepository.edit(id, data);
    return updatedUser;
  }
}