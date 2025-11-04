import { IFindAllPostRepository } from '@/repositories/interface/findAllPostRepositoryInterface';

export class FindAllPostUseCase {
    constructor(private findAllPostRepository: IFindAllPostRepository) {}

    async handler(page: number, limit: number){
        return this.findAllPostRepository.findAll(page, limit);

    }
}