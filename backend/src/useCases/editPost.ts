import { IEditRepository } from '@/repositories/interface/editPostRepositoryInterface';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

export class EditPostUseCase {
  constructor(private editPostRepository: IEditRepository) {}

  async handler(id: number, data: { title?: string; content?: string }): Promise<void> {
    const edited = await this.editPostRepository.edit(id, data);

    if (!edited) {
      throw new ResourceNotFoundError();
    }
  }
}