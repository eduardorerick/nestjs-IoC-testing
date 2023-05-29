import { User } from './entity/user.entity';

export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
}
