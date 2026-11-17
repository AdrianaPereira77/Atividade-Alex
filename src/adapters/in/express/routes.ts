import { Router } from 'express';
import { CreateUserUseCase } from '../../../application/ports/in/CreateUserUseCase';

export const createUserRoutes = (createUserUseCase: CreateUserUseCase) => {
  const router = Router();

  /** Recebe POST /users, chama o caso de uso e envia a resposta HTTP. */
  router.post('/users', async (req, res) => {
    if (typeof req.body?.name !== 'string') {
      return res.status(400).json({ message: "O campo 'name' é obrigatório e deve ser texto." });
    }

    try {
      const user = await createUserUseCase.execute({ name: req.body.name });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Erro ao criar usuário.',
      });
    }
  });

  return router;
};
