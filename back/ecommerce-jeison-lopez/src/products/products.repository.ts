import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

// Products falsos.
const products: Product[] = [
  {
    id: '1',
    name: 'Product One',
    description: 'Description for product one',
    price: 100,
    stock: true,
    imgUrl: 'http://example.com/img1.jpg',
  },
  {
    id: '2',
    name: 'Product Two',
    description: 'Description for product two',
    price: 200,
    stock: false,
    imgUrl: 'http://example.com/img2.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  async getProducts(): Promise<Product[]> {
    return await products;
  }
}
