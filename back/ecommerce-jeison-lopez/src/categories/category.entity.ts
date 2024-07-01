import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Product } from '../products/product.entity';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50 })
  name: string;

  @OneToOne(() => Product, (product) => product.category)
  products: Product[];
}
