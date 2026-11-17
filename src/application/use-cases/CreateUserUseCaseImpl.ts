import { User } from '../../core/User';
import { CreateUserInput, CreateUserUseCase } from '../ports/in/CreateUserUseCase';
import { UserRepository } from '../ports/out/UserRepository';

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  /** Recebe a implementação de persistência pela porta de saída. */
  constructor(private readonly userRepository: UserRepository) {}

  /** Valida o nome, monta o usuário e solicita que seja salvo. */
  async execute(input: CreateUserInput): Promise<User> {
    const name = input.name.trim();
    if (!name) throw new Error('O nome é obrigatório.');

    const user: User = { name };

    return this.userRepository.save(user);
  }
}
