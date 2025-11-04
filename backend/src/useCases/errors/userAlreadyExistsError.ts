export class UserAlreadyExistsError extends Error {
    constructor() {
      super('Usuário com este nome já existe.');
    }
  }