import { IFindAllAlunoRepository } from '@/repositories/interface/findAllAlunoRepositoryInterface';

export class FindAllAlunoUseCase {
    constructor(private findAllAlunoRepository: IFindAllAlunoRepository) {}

    async handler(page: number, limit: number){
        return this.findAllAlunoRepository.findAll(page, limit);

    }
}