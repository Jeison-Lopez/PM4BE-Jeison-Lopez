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
import { Role } from './roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities/users.entity';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsers(page, limit);
  }
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<Users>,
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('test')
  getTest() {
    return 'Ruta de test para Rol user';
  }
}
