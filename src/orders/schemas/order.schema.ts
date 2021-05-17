import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString } from 'class-validator';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  @IsString()
  customerName: string;

  @Prop()
  @IsString()
  productName: string;

  @Prop()
  @IsString()
  finalPrice: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
