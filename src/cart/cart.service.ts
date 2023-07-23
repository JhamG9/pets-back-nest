import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './cart.schema';
import { Model, Types } from 'mongoose';
import { AddProductCartDto } from './dto/add-product-cart.dto';
import { Product, ProductDocument } from 'src/products/product.schema';
import { validate } from 'class-validator'; // Importamos el método validate

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async addToCart(cartItemDto: AddProductCartDto) {
    const { product_id, quantity } = cartItemDto;

    try {
      // Verificar si el producto existe
      const productExists = await this.productModel.exists({
        _id: new Types.ObjectId(product_id),
      });

      if (!productExists) {
        throw new NotFoundException('Product not found');
      }
      const existingItem = await this.cartModel.findOne({ product_id }).exec();

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.updated_at = new Date();
        await existingItem.save();
      } else {
        await this.cartModel.create({ product_id, quantity });
      }
    } catch (error) {
      throw error;
    }
  }

  // Obtiene todos los elementos del carrito
  async getAllCartItems(): Promise<Cart[]> {
    return this.cartModel
      .find()
      .populate({ path: 'product_id', select: 'name price' })
      .exec();
  }

  async removeFromCart(id: string) {
    try {

      if(!Types.ObjectId.isValid(id)){
        throw new BadRequestException('Invalid id')
      }


      const deletedItem = await this.cartModel.findByIdAndRemove(new Types.ObjectId(id)).exec();
      if (!deletedItem) {
        throw new NotFoundException('Product in cart not found');
      }
    } catch (error) {
      throw error;
    }
  }
}
