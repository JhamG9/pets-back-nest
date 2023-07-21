import { Controller, Body, Post, Res, HttpStatus, Put, Param, Get, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { Pagination } from 'src/interfaces/pagination.interface';
import { Product } from './product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAllProducts(@Query() getProductsDto: GetProductsDto, @Res() res) {
    const productsPagination = await this.productService.getAllProducts(getProductsDto);

    const response = {
      message: 'Products retrieved successfully',
      data: productsPagination.data,
      pagination: productsPagination.pagination,
    };

    return res.json(response);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto, @Res() res) {
    const createdProduct = await this.productService.create(createProductDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Product created successfully',
      data: createdProduct,
    });
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res) {
    const updatedProduct = await this.productService.updateProduct(id, updateProductDto);

    if (!updatedProduct) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Product not found',
      });
    }

    return res.json({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string, @Res() res) {
    const product = await this.productService.getProductById(id);

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Product not found',
        data: null,
      });
    }

    return res.json({
      message: 'Product retrieved successfully',
      data: product,
    });
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string, @Res() res) {
    const deletedProduct = await this.productService.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Product not found',
        data: null,
      });
    }

    return res.json({
      message: 'Product deleted successfully'
    });
  }
}
