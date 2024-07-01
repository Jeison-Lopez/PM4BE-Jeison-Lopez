import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'order_details',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
