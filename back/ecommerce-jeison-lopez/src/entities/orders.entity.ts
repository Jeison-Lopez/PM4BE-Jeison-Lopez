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

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
