export class Database {
  constructor() {
    console.log('Mocked database connected.');
  }

  async disconnect() {
    console.log('Mocked database disconnected.');
    return Promise.resolve();
  }
}

export const database = new Database();