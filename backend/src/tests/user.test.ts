import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import { env } from '../env';
import { database as realDatabase } from '../lib/pg/db';

const mySecret = env.JWT_SECRET;

// Mock do use case de criação de usuário
jest.mock('../useCases/factory/makeCreateUserUseCase', () => ({
  makeCreateUserUseCase: () => ({
    handler: jest.fn().mockResolvedValue({ username: 'teste' }),
  }),
}));

jest.mock('../repositories/pg/findUserByUsernameRepository', () => ({
  FindUserByUsernameRepository: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue({ 
      username: 'teste', 
      password: 'senha123' 
    }),
  })),
}));

// Mock do database para evitar conexão real
jest.mock('../lib/pg/db');

type MockedDatabase = typeof realDatabase & {
  disconnect: () => Promise<void>;
};

describe('Testes da API Users', () => {
  it('deve criar usuário com dados válidos (POST)', async () => {
    const token = jwt.sign({ username: 'teste' }, mySecret);

    const response = await request(app)
      .post('/v1/user')
      .send({
        username: 'teste',
        password: 'senha123',
        role: 'professor',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Usuário teste criado');
  });

  afterAll(async () => {
    const { database } = await import('../lib/pg/db');
    await (database as MockedDatabase).disconnect();
  });
});