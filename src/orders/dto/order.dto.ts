import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrederedProductDto } from './ordered-product.dto';

export class OrderDto {
  @ApiProperty()
  @IsString()
  customerName: string;

  @ApiProperty()
  products: OrederedProductDto[];

  @ApiProperty()
  @IsNumber()
  finalPrice: number;
}
