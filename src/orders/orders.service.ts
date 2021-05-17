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

  create(createOrderDto: OrderDto) {
    const order = new this.orderModel(createOrderDto);
    return order.save();
  }

  findAll() {
    return this.orderModel.find();
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
    order.productName = updateOrderDto.productName;
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
}
