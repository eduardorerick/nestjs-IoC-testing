import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/user/domain/user.repository';
import { User, User as UserDto } from 'src/user/domain/entity/user.entity';
import { randomUUID } from 'crypto';

export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];
  async create(data: User): Promise<User> {
    let user = { ...data, _id: randomUUID() };
    this.users.push(user);

    return user;
  }
}
