import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetails } from './orders-details.entity';
import { Categories } from './categories.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  /**
   * UUID v4 generado por la base de datos.
   * @example 'a12b34cd-56ef-78gh-90ij-12kl34mn56op'
   */
  @ApiProperty({
    description: 'UUID v4 generado por la base de datos',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre del producto. Debe ser una cadena de texto única con un máximo de 50 caracteres.
   * @example 'Producto A'
   */
  @ApiProperty({
    description:
      'Nombre del producto. Debe ser una cadena de texto única con un máximo de 50 caracteres',
    example: 'Producto A',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  /**
   * Descripción del producto. Debe ser una cadena de texto.
   * @example 'Este es un producto de ejemplo'
   */
  @ApiProperty({
    description: 'Descripción del producto. Debe ser una cadena de texto',
    example: 'Este es un producto de ejemplo',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  /**
   * Precio del producto. Debe ser un número decimal con precisión de 10 y escala de 2.
   * @example 99.99
   */
  @ApiProperty({
    description:
      'Precio del producto. Debe ser un número decimal con precisión de 10 y escala de 2',
    example: 99.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * Stock del producto. Debe ser un número entero.
   * @example 100
   */
  @ApiProperty({
    description: 'Stock del producto. Debe ser un número entero',
    example: 100,
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  /**
   * URL de la imagen del producto. Debe ser una cadena de texto.
   * @example 'http://example.com/default-image.png'
   */
  @ApiProperty({
    description: 'URL de la imagen del producto. Debe ser una cadena de texto',
    example: 'http://example.com/default-image.png',
  })
  @Column({ type: 'varchar', default: 'default-image-url' })
  imgUrl: string;

  /**
   * Categoría del producto. Relacionado en una relación muchos a uno.
   */
  @ApiProperty({
    description:
      'Categoría del producto. Relacionado en una relación muchos a uno',
    type: () => Categories,
  })
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  /**
   * Detalles de las órdenes que incluyen este producto. Relacionado en una relación muchos a muchos.
   */
  @ApiProperty({
    description:
      'Detalles de las órdenes que incluyen este producto. Relacionado en una relación muchos a muchos',
    type: () => OrderDetails,
    isArray: true,
  })
  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetails[];
}
