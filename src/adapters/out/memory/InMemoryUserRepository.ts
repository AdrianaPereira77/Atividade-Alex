import { User } from '../../../core/User';
import { UserRepository } from '../../../application/ports/out/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  /** Adiciona o usuário ao array em memória e o retorna. */
  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
