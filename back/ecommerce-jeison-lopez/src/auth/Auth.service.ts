import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { Users } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth() {
    return 'Authenticating...';
  }

  async signIn(email: string, password: string) {
    //Verificar que el usuario exista
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('Credenciales incorrectas');

    // Validar password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new BadRequestException('Credenciales incorrectas');

    // Firmar token
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // if (!user || user.password !== password) {
    //   return 'Email o password incorrectos';
    // }

    return { message: 'Usuario logueao', token };
  }

  async singUp(user: Partial<Users>) {
    const { email, password } = user;

    // Verificar que el email no se encuentre registrado
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser)
      throw new BadRequestException('El mail ya se encuentra registrado');

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    return await this.usersRepository.addUser({
      ...user,
      password: hashedPassword,
    });
  }
}
