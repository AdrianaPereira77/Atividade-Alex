import express from 'express';
import { CreateUserUseCaseImpl } from '../../../application/use-cases/CreateUserUseCaseImpl';
import { InMemoryUserRepository } from '../../out/memory/InMemoryUserRepository';
import { createUserRoutes } from './routes';

/** Configura o Express e conecta os adaptadores ao caso de uso. */
export function createApp() {
  const app = express();

  app.use(express.json());

  const userRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCaseImpl(userRepository);

  app.use(createUserRoutes(createUserUseCase));

  return app;
}
