import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { Pagination } from 'src/interfaces/pagination.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException({statusCode: 404, mesage:'Product not found' });
    }

    Object.keys(updateProductDto).forEach((key) => {
    if (updateProductDto[key] !== undefined) {
      product[key] = updateProductDto[key];
    }
  });

    product.updated_at = new Date();
    return product.save();
  }

   async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async deleteProduct(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }

    return deletedProduct;
  }

  async getAllProducts(getProductsDto: GetProductsDto): Promise<{ data: Product[]; pagination: Pagination }> {
    const { page, limit } = getProductsDto;
    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      this.productModel.find().skip(skip).limit(limit).exec(),
      this.productModel.countDocuments().exec(),
    ]);

    const totalPage = Math.ceil(totalCount / limit);
    const nextPage = page < totalPage ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const pagination: Pagination = {
      page,
      limit,
      totalCount,
      totalPage,
    };

    if (nextPage) {
      pagination.next = `/products?page=${nextPage}&limit=${limit}`;
    }

    if (prevPage) {
      pagination.previous = `/products?page=${prevPage}&limit=${limit}`;
    }

    return { data, pagination };
  
  }

}
