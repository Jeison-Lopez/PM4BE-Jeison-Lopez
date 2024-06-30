import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(
    page: number = 1,
    limit: number = 5,
  ): Promise<Omit<User, 'password'>[]> {
    return this.usersRepository.getUsers(page, limit);
  }

  getUser(id: string) {
    return this.usersRepository.getUser(id);
  }

  createUser(user: Omit<User, 'id'>) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: Partial<User>) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
