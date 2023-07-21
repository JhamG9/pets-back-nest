import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsString()
    readonly description: string;
  
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
  
    @IsNotEmpty()
    @IsNumber()
    readonly quantity: number;
  
    @IsNotEmpty()
    @IsString()
    readonly image_url: string;
  
    readonly characteristics: string;
}
