import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Get()
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsers(page, limit);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }

  // @Post()
  // createUser(@Body() user: CreateUserDto) {
  //   if (
  //     !user.name ||
  //     !user.email ||
  //     !user.password ||
  //     !user.address ||
  //     !user.phone
  //   ) {
  //     return {
  //       message: 'Faltan campos obligatorios',
  //     };
  //   }
  //   return this.usersService.addUser(user);
  // }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<User>,
  ) {
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
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
