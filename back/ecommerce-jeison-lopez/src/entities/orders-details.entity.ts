import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERDETAILS',
})
export class OrderDetails {
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
   * Precio total de los detalles de la orden. Debe ser un número decimal con precisión de 10 y escala de 2.
   * @example 199.99
   */
  @ApiProperty({
    description:
      'Precio total de los detalles de la orden. Debe ser un número decimal con precisión de 10 y escala de 2',
    example: 199.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * Orden asociada a los detalles de la orden. Relacionado en una relación uno a uno.
   */
  @ApiProperty({
    description:
      'Orden asociada a los detalles de la orden. Relacionado en una relación uno a uno',
    type: () => Orders,
  })
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  /**
   * Lista de productos incluidos en los detalles de la orden. Relacionado en una relación muchos a muchos.
   */
  @ApiProperty({
    description:
      'Lista de productos incluidos en los detalles de la orden. Relacionado en una relación muchos a muchos',
    type: () => Products,
    isArray: true,
  })
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
    joinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];
}
