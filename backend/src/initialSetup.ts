import { database } from '@/lib/pg/db';
import { hash } from 'bcryptjs';
import { env } from './env';


export async function ensureFirstProfessorExists() {
    const client = database.clientInstance;
    if (!client) { 
        throw new Error('Database client not initialized');
    }
  
    const result = await client.query('SELECT * FROM users WHERE role = $1', ['professor']);
  
    if (result.rows.length > 0) {
      console.log('Professor inicial já existe.');
      return;
    }
  
    const username = env.ADMIN_USERNAME;
    const password = env.ADMIN_PASSWORD;
    const hashedPassword = await hash(password, 8);
  
    await client.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
      [username, hashedPassword, 'professor']
    );
  
    console.log(`Primeiro professor criado: ${username}`);
  }