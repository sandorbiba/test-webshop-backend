import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsNumber, IsString } from 'class-validator';

interface Product {
  product: string;
  quantity: number;
  productPrice: number;
  productName: string;
}

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  @IsString()
  customerName: string;

  @Prop({
    type: [
      {
        quantity: { type: Number },
        product: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
      },
    ],
    _id: false,
  })
  products: { quantity: number; product: Product }[];

  @Prop()
  @IsNumber()
  finalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
