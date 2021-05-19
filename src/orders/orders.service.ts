import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto) {
    let order = await this.orderModel.create(createOrderDto);

    order = await this.orderModel
      .findById(order._id)
      .populate('products.product');

    const finalPrice = order.products.reduce((acc, product) => {
      const price = product.product.productPrice * product.quantity;
      return acc + price;
    }, 0);

    await order.updateOne({ finalPrice });

    order = await this.orderModel
      .findById(order._id)
      .populate('products.product');

    return order;
  }

  async findAll() {
    return this.orderModel.find().populate('products.product');
  }

  async findOne(id: string) {
    const order = await this.orderModel.findOne({ _id: id });

    if (!order) {
      throw new BadRequestException();
    }

    return order;
  }

  async update(id: string, updateOrderDto: OrderDto) {
    const order = await this.orderModel.findOne({ _id: id });

    if (!order) {
      throw new BadRequestException();
    }

    order.customerName = updateOrderDto.customerName;
    order.finalPrice = updateOrderDto.finalPrice;

    await order.save();

    return order;
  }

  async remove(id: string) {
    const order = await this.orderModel.findOne({ _id: id });

    if (!order) {
      throw new BadRequestException();
    }

    await this.orderModel.deleteOne({ _id: id });
  }

  dropCollection() {
    return this.orderModel.deleteMany({});
  }
}
