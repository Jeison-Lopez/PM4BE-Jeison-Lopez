import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Products } from 'src/entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Products,
  ) {
    // Validación de al menos un campo a actualizar
    if (
      !product.name &&
      !product.description &&
      !product.price &&
      !product.stock &&
      !product.imgUrl
    ) {
      return {
        message: 'Nada que actualizar',
      };
    }
    return this.productsService.updateProduct(id, product);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
