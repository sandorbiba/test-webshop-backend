import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNumber()
  productPrice: number;
}
