import { EditUserRepository } from '@/repositories/pg/editUserRepository';
import { EditUserUseCase } from '../editUser';

export function makeEditUserUseCase() {
    const editUserRepository = new EditUserRepository();
    const editUserUseCase = new EditUserUseCase(editUserRepository);
    return editUserUseCase;
 }