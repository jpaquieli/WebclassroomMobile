import { IDeletePostRepository } from '@/repositories/interface/deletePostInterfaceRepository';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

export class DeletePostUseCase {
    constructor(private deletePostRepository: IDeletePostRepository) {}
  
    async handler(id: number): Promise<void> {
      const deleted = await this.deletePostRepository.delete(id);
  
      if (!deleted) {
        throw new ResourceNotFoundError();
      }
    }
  }