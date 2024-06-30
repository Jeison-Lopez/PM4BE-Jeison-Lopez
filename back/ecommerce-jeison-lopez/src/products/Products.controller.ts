import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
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
