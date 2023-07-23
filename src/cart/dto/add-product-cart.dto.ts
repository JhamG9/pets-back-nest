import { IsMongoId, IsNumber, IsObject, IsString, Min } from 'class-validator';

export class AddProductCartDto {
  @IsString()
  @IsMongoId()
  product_id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
