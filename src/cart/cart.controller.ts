import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import { AddProductCartDto } from './dto/add-product-cart.dto';
import { CartService } from './cart.service';
import { Cart } from './cart.schema';
import { CreateProductMiddleware } from 'src/middleware/create-product.middleware';

@Controller('cart')
export class CartController {
  
  constructor(private cartService: CartService){}

  @Post()
  async addToCart(@Body() cartItemDto: AddProductCartDto, @Res() res) {
    try {
      await this.cartService.addToCart(cartItemDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Product added to cart successfully',
        data: cartItemDto,
      });
    } catch (error:any) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error: error.response
      });
    }
  }

  @Get()
  async getAllCartItems(@Res() res) {
    const cartItems: Cart[] = await this.cartService.getAllCartItems();
    return res.status(HttpStatus.OK).json({
      message: 'All cart items retrieved successfully',
      data: cartItems,
    });
  }

  @Delete(':id')
  @UseInterceptors(CreateProductMiddleware)
  async removeFromCart(@Param('id') id: string, @Res() res) {
    try {
      await this.cartService.removeFromCart(id);
      return res.status(HttpStatus.OK).json({
        message: 'Producr removed of cart successfully',
      });
    } catch (error) {
      return res.status(error.response.statusCode).json({
        error: error.response
      });
    }
  }
}
