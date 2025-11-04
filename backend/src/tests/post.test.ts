import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import { env } from '../env';
import { database as realDatabase } from '../lib/pg/db';

const mySecret = env.JWT_SECRET;

const postTeste = {
    id: 1,
    title: 'teste',
    content: 'teste',
    datetime: '2025-07-23T23:58:19.583Z',
    author: 'teste',
};

jest.mock('../useCases/factory/makeCreatePostUseCase', () => ({
  makeCreatePostUseCase: () => ({
    handler: jest.fn().mockResolvedValue(postTeste),
  }),
}));

jest.mock('../useCases/factory/makeFindAllPostUseCase', () => ({
  makeFindAllPostUseCase: () => ({
    handler: jest.fn().mockResolvedValue([postTeste]),
  }),
}));

jest.mock('../useCases/factory/makeDeletePostUseCase', () => ({
  makeDeletePostUseCase: () => ({
    handler: jest.fn().mockResolvedValue({ id: 1 }),
  }),
}));

jest.mock('../useCases/factory/makeFindPostByIdUseCase', () => ({
  makeFindPostByIdUseCase: () => ({
    handler: jest.fn().mockResolvedValue(postTeste),
  }),
}));

jest.mock('../useCases/factory/makeCreateEditPostUseCase', () => ({
    makeEditPostUseCase: () => ({
      handler: jest.fn().mockResolvedValue({ id: 1 }),
    }),
  }));

jest.mock('../lib/pg/db');

type MockedDatabase = typeof realDatabase & {
  disconnect: () => Promise<void>;
};

let mockedDatabase: MockedDatabase;

describe('Testes da API Posts', () => {
  beforeAll(async () => {
    const { database } = await import('../lib/pg/db');
    mockedDatabase = database as MockedDatabase;
  });

  it('deve criar um post (POST)', async () => {
    const token = jwt.sign(
      { username: 'teste', role: 'professor' },
      mySecret || 'default_test_secret'
    );

    const response = await request(app)
      .post('/v1/post')
      .send({
        title: 'teste',
        content: 'teste',
        author: 'teste',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.text).toContain('Post de id 1 criado.');
  });

  it('deve retornar todos os posts com sucesso (GET)', async () => {
    const token = jwt.sign(
      { username: 'teste', role: 'professor' },
      mySecret || 'default_test_secret'
    );

    const response = await request(app)
      .get('/v1/post')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);

    const post = response.body[0];
    expect(post).toMatchObject(postTeste);
  });

  it('deve deletar um post com sucesso (DELETE)', async () => {
    const token = jwt.sign(
      { username: 'teste', role: 'professor' },
      mySecret || 'default_test_secret'
    );

    const response = await request(app)
      .delete('/v1/post/1')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Post de id 1 deletado.');
  });

  it('deve retornar um post pelo ID (GET /v1/post/:id)', async () => {
    const token = jwt.sign(
      { username: 'teste', role: 'professor' },
      mySecret || 'default_test_secret'
    );

    const response = await request(app)
      .get('/v1/post/1')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toMatchObject(postTeste);
  });

  it('deve editar um post com sucesso (PATCH)', async () => {
    const token = jwt.sign(
      { username: 'teste', role: 'professor' },
      mySecret || 'default_test_secret'
    );

    const response = await request(app)
      .patch('/v1/post/1')
      .send({
        title: 'novo título',
        content: 'novo conteúdo', 
        author: 'teste',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    console.log('Response:', response.status, response.text); 
    expect(response.status).toBe(200);
    expect(response.text).toContain('Post de id 1 editado.');
  });

  afterAll(async () => {
    await mockedDatabase.disconnect();
  });
});