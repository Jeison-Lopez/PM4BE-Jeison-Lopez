import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'USERS',
})
export class Users {
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
   * Nombre del usuario. Debe ser una cadena de texto con un máximo de 50 caracteres.
   * @example 'John Doe'
   */
  @ApiProperty({
    description:
      'Nombre del usuario. Debe ser una cadena de texto con un máximo de 50 caracteres',
    example: 'John Doe',
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * Correo electrónico del usuario. Debe ser una cadena de texto única con un máximo de 50 caracteres.
   * @example 'johndoe@example.com'
   */
  @ApiProperty({
    description:
      'Correo electrónico del usuario. Debe ser una cadena de texto única con un máximo de 50 caracteres',
    example: 'johndoe@example.com',
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  /**
   * Contraseña del usuario. Debe ser una cadena de texto con un máximo de 128 caracteres.
   * @example 'password123!'
   */
  @ApiProperty({
    description:
      'Contraseña del usuario. Debe ser una cadena de texto con un máximo de 128 caracteres',
    example: 'password123!',
  })
  @Column({ type: 'varchar', length: 128, nullable: false })
  password: string;

  /**
   * Número de teléfono del usuario.
   * @example 123456789
   */
  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: 123456789,
  })
  @Column({ type: 'int' })
  phone: number;

  /**
   * País del usuario. Debe ser una cadena de texto con un máximo de 50 caracteres.
   * @example 'USA'
   */
  @ApiProperty({
    description:
      'País del usuario. Debe ser una cadena de texto con un máximo de 50 caracteres',
    example: 'USA',
  })
  @Column({ type: 'varchar', length: 50 })
  country: string;

  /**
   * Dirección del usuario. Debe ser una cadena de texto.
   * @example '1234 Elm Street'
   */
  @ApiProperty({
    description: 'Dirección del usuario. Debe ser una cadena de texto',
    example: '1234 Elm Street',
  })
  @Column({ type: 'text' })
  address: string;

  /**
   * Ciudad del usuario. Debe ser una cadena de texto con un máximo de 50 caracteres.
   * @example 'New York'
   */
  @ApiProperty({
    description:
      'Ciudad del usuario. Debe ser una cadena de texto con un máximo de 50 caracteres',
    example: 'New York',
  })
  @Column({ type: 'varchar', length: 50 })
  city: string;

  /**
   * Indica si el usuario es administrador. Valor por defecto es false.
   */
  @ApiProperty({
    description:
      'Indica si el usuario es administrador. Valor por defecto es false',
  })
  @Column({ default: false })
  isAdmin: boolean;

  /**
   * Lista de órdenes asociadas al usuario.
   */
  @ApiProperty({
    description: 'Lista de órdenes asociadas al usuario',
    type: () => Orders,
    isArray: true,
  })
  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
