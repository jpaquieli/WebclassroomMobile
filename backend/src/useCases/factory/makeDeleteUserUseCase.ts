import { DeleteUserRepository } from '@/repositories/pg/deleteUserRepository';
import { DeleteUserUseCase } from '../deleteUser';

export function makeDeleteUserUseCase() {
    const deleteUserRepository = new DeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
    return deleteUserUseCase;
 }