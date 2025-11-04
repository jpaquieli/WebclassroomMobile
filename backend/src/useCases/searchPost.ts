import { ISearchPostRepository } from '@/repositories/interface/searchPostRepositoryInterface';

export class SearchPostUseCase {
    constructor(private searchPostRepository: ISearchPostRepository) {}

    async handler(keyWord: string, page: number, limit: number){
        return this.searchPostRepository.search(keyWord, page, limit);

    }
}