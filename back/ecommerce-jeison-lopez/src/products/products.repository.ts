import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number = 1, limit: number = 5): Promise<Products[]> {
    const products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    // Calcular los índices de inicio y fin para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = products.slice(startIndex, endIndex);
    return await paginatedProducts;
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      return `Producto con id ${id} no encontrado`;
    }
    return product;
  }

  async addProducts() {
    // Verificamos que exista la categoría.
    const categories = await this.categoriesRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      // Creamos el nuevo Product y seteamos los atributos.
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;
      // Grabamos el nuevo Producto en la Base de Datos.
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        // Si el producto existe, lo actualizamos.
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });
    return 'Productos agregados';
  }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const updateProduct = await this.productsRepository.findOneBy({
      id,
    });
    return updateProduct;
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      return `Producto con id ${id} no encontrado`;
    }
    await this.productsRepository.delete(id);
    return `Producto con id ${id} eliminado`;
  }
}
