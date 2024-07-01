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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }
  @UseGuards(AuthGuard)
  @Post()
  async createProduct(@Body() product: Omit<Product, 'id'>) {
    // Validación de campos requeridos
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.stock ||
      !product.imgUrl
    ) {
      return {
        message: 'Faltan campos obligatorios',
      };
    }
    return this.productsService.createProduct(product);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: Partial<Product>,
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
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
