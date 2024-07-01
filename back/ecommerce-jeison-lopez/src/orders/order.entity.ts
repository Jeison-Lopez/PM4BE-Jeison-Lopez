import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderDetails } from './order-details.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @OneToMany(() => User, (user) => user.orders)
  user: User;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[];
}
