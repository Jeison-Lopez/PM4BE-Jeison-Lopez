import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'CATEGORIES' })
export class Categories {
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
   * Nombre de la categoría. Debe ser una cadena de texto única con un máximo de 50 caracteres.
   * @example 'Electrónica'
   */
  @ApiProperty({
    description:
      'Nombre de la categoría. Debe ser una cadena de texto única con un máximo de 50 caracteres',
    example: 'Electrónica',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  /**
   * Lista de productos asociados a la categoría. Relacionado en una relación uno a muchos.
   */
  @ApiProperty({
    description:
      'Lista de productos asociados a la categoría. Relacionado en una relación uno a muchos',
    type: () => Products,
    isArray: true,
  })
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
