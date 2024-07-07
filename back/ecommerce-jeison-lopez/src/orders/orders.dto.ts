import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  /**
   * El ID del usuario que realiza la orden. Debe ser un UUID válido.
   * @example 'a12b34cd-56ef-78gh-90ij-12kl34mn56op'
   */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Lista de productos en la orden. Debe ser un array con al menos un elemento.
   * @example [{ productId: '1234', quantity: 2 }]
   */
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
