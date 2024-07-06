import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Obtenemos contexto de ejecución
    const request = context.switchToHttp().getRequest();
    // Extraer el token desde headers
    // Authorization Bearer: TOKEN...
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token requerido');
    try {
      // validacion del token
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      if (!user) {
        throw new UnauthorizedException('Error al validar Token');
      }
      // Adjuntar fecha de expiracion
      user.exp = new Date(user.exp * 1000);

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Error al validar Token');
    }
  }
}
