import { Router } from 'express';
import { createProfessor } from './createProfessor';
import { createAluno } from './createAluno';
import { signin } from './signIn';
import { findAllProfessor } from './findAllProfessor';
import { findAllAluno } from './findAllAluno';
import { deleteUser } from './deleteUser';
import { validateRole } from '@/http/middlewares/roleValidate';
import { editUser } from './editUser';

const userRouter = Router();

userRouter.post('/user/professor', validateRole, createProfessor);
userRouter.post('/user/aluno', validateRole, createAluno);
userRouter.post('/user/signin', signin);
userRouter.patch('/user/:id', validateRole, editUser);
userRouter.get('/user/professor', validateRole, findAllProfessor);
userRouter.get('/user/aluno', validateRole, findAllAluno);
userRouter.delete('/user/:id', validateRole, deleteUser);

export default userRouter;