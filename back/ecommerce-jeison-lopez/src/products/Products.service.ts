import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts(page: number = 1, limit: number = 5) {
    return this.productsRepository.getProducts(page, limit);
  }

  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  createProduct(product: Omit<Product, 'id'>) {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: string, product: Partial<Product>) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
