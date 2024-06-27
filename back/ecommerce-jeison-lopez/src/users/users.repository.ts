import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

// Usuarios falsos.
const users: User[] = [
  {
    id: '1',
    email: 'user1@example.com',
    name: 'User One',
    password: 'password1',
    address: '123 Main St',
    phone: '123-456-7890',
    country: 'Country1',
    city: 'City1',
  },
  {
    id: '2',
    email: 'user2@example.com',
    name: 'User Two',
    password: 'password2',
    address: '456 Elm St',
    phone: '098-765-4321',
  },
];

@Injectable()
export class UsersRepository {
  async getUsers(): Promise<User[]> {
    return await users;
  }
}
