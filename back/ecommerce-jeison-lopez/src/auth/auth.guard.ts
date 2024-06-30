import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      response.status(401).send('Authorization header is missing');
      return false;
    }

    const authHeaderParts = authHeader.split(' ');

    if (authHeaderParts.length !== 2 || authHeaderParts[0] !== 'Basic') {
      response.status(401).send('Authorization header format is invalid');
      return false;
    }

    const credentials = authHeaderParts[1].split(':');

    if (credentials.length !== 2 || !credentials[0] || !credentials[1]) {
      response
        .status(401)
        .send('Authorization header must contain email and password');
      return false;
    }

    return true;
  }
}
