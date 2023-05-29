import { UserInMemoryRepository } from '../db/in-memory/user.in-memory-repository';
import { CreateUserUseCase } from '../domain/use-cases/create-user.use-case';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    let userRepo = new UserInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userRepo);
  });

  it('should create a user with an id', async () => {
    const result = await createUserUseCase.execute({
      name: 'Nome teste',
      password: 'Senha teste',
    });

    expect(result._id).toBeDefined();
  });

  it('should create a user with hash password', async () => {
    const result = await createUserUseCase.execute({
      name: 'Nome teste',
      password: 'Senha teste',
    });
    expect(result.hash).toBeDefined();
    expect(result.hash).not.toEqual('Senha teste');
  });
});
