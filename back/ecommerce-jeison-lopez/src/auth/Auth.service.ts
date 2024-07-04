import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Authenticating...';
  }

  async signIn(email: string, password: string): Promise<string> {
    if (!email || !password) {
      return 'Email o password incorrectos';
    }

    const user = await this.usersRepository.getUserByEmail(email);

    // if (!user || user.password !== password) {
    //   return 'Email o password incorrectos';
    // }

    return 'Inicio de sesión exitoso';
  }
}
