import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  createProduct(createProductDto: ProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  findAllProducts() {
    return this.productModel.find();
  }

  async findOneProduct(id: string) {
    const product = await this.productModel.findOne({ _id: id });

    if (!product) {
      throw new BadRequestException();
    }

    return product;
  }

  async updateProduct(id: string, updateProductDto: ProductDto) {
    const product = await this.productModel.findOne({ _id: id });

    if (!product) {
      throw new BadRequestException();
    }

    product.productName = updateProductDto.productName;
    product.productPrice = updateProductDto.productPrice;

    await product.save();

    return product;
  }

  async removeProduct(id: string) {
    const product = await this.productModel.findOne({ _id: id });

    if (!product) {
      throw new BadRequestException();
    }

    await this.productModel.deleteOne({ _id: id });
  }

  dropCollection() {
    return this.productModel.deleteMany({});
  }
}
