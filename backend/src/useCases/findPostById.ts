import { IPost } from '@/entities/models/postInterface';
import { IFindPostByIdRepository } from '@/repositories/interface/findPostByIdRepositoryInterface';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

export class FindPostByIdUseCase {
    constructor(private findPostByIdRepository: IFindPostByIdRepository) {}

    async handler(id: number): Promise<IPost> {
        const post = await this.findPostByIdRepository.findById(id);

        if(!post) {throw new ResourceNotFoundError();}

        return post;
    }
}