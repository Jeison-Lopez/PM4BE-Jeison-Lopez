import { Module } from '@nestjs/common';
import { ProductsService } from './Products.service';
import { ProductsController } from './Products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
