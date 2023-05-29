import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserRepository } from 'src/user/domain/user.repository';
import { User as UserDto } from 'src/user/domain/entity/user.entity';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(data: UserDto): Promise<UserDto> {
    const user = await this.userModel.create(data);

    const userObject = user.toObject();
    let formattedUser = {
      _id: String(userObject._id),
      name: userObject.name,
      hash: userObject.hash,
    };
    return formattedUser;
  }
}
