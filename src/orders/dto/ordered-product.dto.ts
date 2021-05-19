import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OrederedProductDto {
  @ApiProperty()
  @IsString()
  product: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}
