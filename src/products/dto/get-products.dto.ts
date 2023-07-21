import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class GetProductsDto {
    @IsOptional()
    page?: number = 1; // Página actual (por defecto, la primera)
  
    @IsOptional()
    limit?: number = 10; // Número de productos por página (por defecto, 10)
}