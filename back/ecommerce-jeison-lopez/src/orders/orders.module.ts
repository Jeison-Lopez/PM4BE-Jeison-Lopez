/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { OrderDetails } from 'src/entities/orders-details.entity';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';
import { OrdersRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
