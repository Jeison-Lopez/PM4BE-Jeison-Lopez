import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orders-details.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async addOrder(userId: string, products: any) {
    let total = 0;

    // Verificamos que exista el Usuario.
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      return `Usuario con id ${userId} no encontrado`;
    }

    // Creamos la Orden.
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    // Guardamos la orden para obtener el id.
    const newOrder = await this.ordersRepository.save(order);

    //Asociamos cada id recibido con el Producto
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          return `Producto con id ${element.id} no encontrado`;
        }
        // Calculamos el Monto total.
        total += Number(product.price);
        // Actualizamos el "Stock"
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    // Creamos "OrderDetail" y la insertamos en BBDD.
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailRepository.save(orderDetail);

    // Enviamos al cliente la compra con la info de productos
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  getOrder(id: string) {
    const order = this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      return `Orden con id ${id} no encontrada`;
    }
    return order;
  }
}
