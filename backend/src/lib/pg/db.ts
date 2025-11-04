import { Pool, PoolClient } from 'pg';
import 'dotenv/config';
import { env } from '@/env';

const isProduction = env.NODE_ENV === 'production';

const CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
};

class Database {
  private pool: Pool;
  private client: PoolClient | undefined;

  constructor() {
    this.pool = new Pool(CONFIG);
    this.connection();
  }

  private async connection() {
    try {
      this.client = await this.pool.connect();
      console.log('Database connected.');
    } catch (error) {
      console.error(`Error connecting to database: ${error}`);
      throw new Error(`Error connecting to database: ${error}`);
    }
  }

  get clientInstance() {
    return this.client;
  }

  async close() {
    if (this.client) {
      this.client.release();
      this.client = undefined;
    }
    await this.pool.end();
  }
}

export const database = new Database();