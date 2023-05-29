import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './db/mongo/schema/user.schema';
import { CreateUserUseCase } from './domain/use-cases/create-user.use-case';
import { UserRepository } from './domain/user.repository';
import { UserMongoRepository } from './db/mongo/user.mongo-repository';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: UserMongoRepository },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: UserRepository) => {
        return new CreateUserUseCase(userRepo);
      },
      inject: [UserRepository],
    },
  ],
})
export class UserModule {}
