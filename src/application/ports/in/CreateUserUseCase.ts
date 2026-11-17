import { User } from '../../../core/User';

export type CreateUserInput = {
  name: string;
};

export interface CreateUserUseCase {
  /** Cria um usuário a partir dos dados recebidos pela aplicação. */
  execute(input: CreateUserInput): Promise<User>;
}
