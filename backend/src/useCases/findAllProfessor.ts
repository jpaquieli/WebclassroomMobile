import { IFindAllProfessorRepository } from '@/repositories/interface/findAllProfessorRepositoryInterface';

export class FindAllProfessorUseCase {
    constructor(private findAllProfessorRepository: IFindAllProfessorRepository) {}

    async handler(page: number, limit: number){
        return this.findAllProfessorRepository.findAll(page, limit);

    }
}