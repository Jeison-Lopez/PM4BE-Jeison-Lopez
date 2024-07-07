import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetails } from './orders-details.entity';
import { Users } from './users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERS',
})
export class Orders {
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
   * Fecha de la orden en formato dd/mm/yy.
   * @example '02/02/2024'
   */
  @ApiProperty({
    description: 'Debe ingresar una fecha con formato dd/mm/yy',
    example: '02/02/2024',
  })
  @Column()
  date: Date;

  /**
   * Detalles de la orden, relacionados en una relación uno a uno.
   */
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  /**
   * Usuario que realizó la orden, relacionado en una relación muchos a uno.
   */
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
