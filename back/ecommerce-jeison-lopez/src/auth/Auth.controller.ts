import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LogginUserDto } from 'src/users/users.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  async signIn(@Body() credentials: LogginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  async singUp(@Body() user: CreateUserDto) {
    const createdUser = await this.authService.signUp(user);
    const { isAdmin, ...response } = createdUser;
    return response;
  }
}
