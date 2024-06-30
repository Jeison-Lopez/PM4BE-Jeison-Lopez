/* eslint-disable @typescript-eslint/no-unused-vars */
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
  getUsers(
    page: number = 1,
    limit: number = 5,
  ): Promise<Omit<User, 'password'>[]> {
    // Calcula los índices de inicio y fin para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Obtiene la porción del array de usuarios para la paginación y elimina el campo 'password'
    const paginatedUsers = users
      .slice(startIndex, endIndex)
      .map(({ password, ...user }) => user);

    // Resuelve la promesa con los usuarios paginados
    return Promise.resolve(paginatedUsers);
  }

  async getUser(id: string): Promise<Omit<User, 'password'> | undefined> {
    const user = users.find((user) => user.id === id);
    if (!user) return undefined;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }

  async createUser(user: Omit<User, 'id'>): Promise<string> {
    const id = (users.length + 1).toString();
    users.push({ id, ...user });
    return id;
  }

  async updateUser(id: string, user: Partial<User>): Promise<string> {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...user };
    return id;
  }

  async deleteUser(id: string): Promise<string> {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    users.splice(index, 1);
    return id;
  }
}
