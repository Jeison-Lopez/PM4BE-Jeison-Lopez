import { Module } from '@nestjs/common';
import { UsersService } from './Users.service';
import { UsersController } from './Users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
