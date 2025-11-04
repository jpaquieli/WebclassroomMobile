import { Router } from 'express';
import { findAll } from './findAll';
import { create } from './create';
import { findById } from './findById';
import { deletePost } from './delete';
import { search } from './search';
import { edit } from './edit';
import { validateRole } from '@/http/middlewares/roleValidate';

const postRouter = Router();

postRouter.get('/post', findAll);
postRouter.get('/post/search', search);
postRouter.get('/post/:id', findById);

postRouter.post('/post', validateRole, create);
postRouter.patch('/post/:id', validateRole, edit);
postRouter.delete('/post/:id', validateRole, deletePost);

export default postRouter;