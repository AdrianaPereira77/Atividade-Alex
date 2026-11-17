import { User } from '../../../core/User';

export interface UserRepository {
  /** Salva um usuário e retorna o registro salvo. */
  save(user: User): Promise<User>;
}
