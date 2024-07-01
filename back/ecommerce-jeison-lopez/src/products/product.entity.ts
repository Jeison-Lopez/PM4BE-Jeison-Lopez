import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { OrderDetails } from '../orders/order-details.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @Column({ default: 'default-image-url' })
  imgUrl: string;

  @OneToMany(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrderDetails)
  @JoinTable()
  orderDetails: OrderDetails[];
}
