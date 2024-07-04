import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number = 1, limit: number = 5) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUser(id: string) {
    return this.usersRepository.getById(id);
  }

  addUser(user: any) {
    return this.usersRepository.addUser(user);
  }

  updateUser(id: string, user: any) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
