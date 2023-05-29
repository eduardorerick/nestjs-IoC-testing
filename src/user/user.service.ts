import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './domain/use-cases/create-user.use-case';
import { User } from './domain/entity/user.entity';
import crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(data: Omit<User, 'hash'> & { password: string }) {
      return this.createUserUseCase.execute(data);
  }
}
