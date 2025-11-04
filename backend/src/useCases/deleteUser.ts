import { IDeleteUserRepository } from '@/repositories/interface/deleteUserRepositoryInterface';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

export class DeleteUserUseCase {
    constructor(private deleteUserRepository: IDeleteUserRepository) {}
  
    async handler(id: number): Promise<void> {
      const deleted = await this.deleteUserRepository.delete(id);
  
      if (!deleted) {
        throw new ResourceNotFoundError();
      }
    }
  }