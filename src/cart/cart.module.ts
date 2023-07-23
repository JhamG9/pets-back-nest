import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './cart.schema';
import { Product, ProductSchema } from 'src/products/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }, { name: Product.name, schema: ProductSchema }]),

  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
