import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    //* Verificamos que exista el producto
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    //* Si le producto existe cargo imagen en Cloudinary
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('Error al subir imagen en Cloudinary');
    }
    //* Actualizar imagen
    //! Manejar el error
    await this.productsRepository.update(productId, {
      imgUrl: response.secure_url,
    });

    const updateProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return updateProduct;
  }
}
