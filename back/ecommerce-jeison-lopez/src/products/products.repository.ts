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

  async getProduct(id: string): Promise<Product | undefined> {
    return products.find((product) => product.id === id);
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<string> {
    const id = (products.length + 1).toString();
    products.push({ id, ...product });
    return id;
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<string> {
    const index = products.findIndex((prod) => prod.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...product };
    return id;
  }

  async deleteProduct(id: string): Promise<string> {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) return null;
    products.splice(index, 1);
    return id;
  }
}
