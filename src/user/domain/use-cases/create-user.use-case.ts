import { User } from '../entity/user.entity';
import { UserRepository } from '../user.repository';
import { pbkdf2Sync, randomBytes } from 'crypto';

export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute(data: Omit<User, 'hash'> & { password: string }) {
    const user = new User();
    user.name = data.name;
    // user.hash = data.password;
    user.hash = pbkdf2Sync(
      data.password,
      randomBytes(16).toString('hex'),
      1000,
      64,
      `sha512`,
    ).toString(`hex`);

    return this.userRepo.create(user);
  }
}
