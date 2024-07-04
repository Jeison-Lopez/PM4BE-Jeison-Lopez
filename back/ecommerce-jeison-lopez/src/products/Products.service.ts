import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts(page: number = 1, limit: number = 5) {
    return this.productsRepository.getProducts(page, limit);
  }

  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  updateProduct(id: string, product: Products) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
