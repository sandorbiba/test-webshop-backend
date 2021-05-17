import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString } from 'class-validator';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  @IsString()
  productName: string;

  @Prop()
  @IsString()
  productPrice: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
