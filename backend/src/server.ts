import { env } from './env';
import { app } from './app';
import { database } from '@/lib/pg/db';
import { ensureFirstProfessorExists } from './initialSetup';

// Função para esperar o client estar pronto
async function waitForClient(timeout = 5000) {
  const start = Date.now();
  while (!database.clientInstance) {
    if (Date.now() - start > timeout) {
      throw new Error('Database client not initialized after waiting');
    }
    await new Promise(res => setTimeout(res, 50)); // espera 50ms
  }
}

async function startServer() {
  try {
    await waitForClient(); // espera o client do db ficar pronto

    await ensureFirstProfessorExists(); // cria professor se necessário

    app.listen({
      host: '0.0.0.0',
      port: env.PORT
    }, () => {
      console.log(`Server is running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();