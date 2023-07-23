import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class GetProductsDto {
    @IsOptional()
    page?: number = 1;
  
    @IsOptional()
    limit?: number = 10;
}