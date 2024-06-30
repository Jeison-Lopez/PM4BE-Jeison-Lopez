import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.usersService.getUsers(page, limit);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  async createUser(@Body() user: Omit<User, 'id'>) {
    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.address ||
      !user.phone
    ) {
      return {
        message: 'Faltan campos obligatorios',
      };
    }
    return this.usersService.createUser(user);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: Partial<User>) {
    if (
      !user.name &&
      !user.email &&
      !user.password &&
      !user.address &&
      !user.phone
    ) {
      return {
        message: 'Nada que actualizar',
      };
    }
    return this.usersService.updateUser(id, user);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
