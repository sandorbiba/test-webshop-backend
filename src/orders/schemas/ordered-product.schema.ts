import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import * as mongoose from 'mongoose';
import { Product } from '../../products/schemas/product.schema';

export type OrderedProductDocument = OrderedProduct & Document;

@Schema()
export class OrderedProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  @IsNumber()
  quantity: number;
}

export const OrderedProductSchema = SchemaFactory.createForClass(
  OrderedProduct,
);
