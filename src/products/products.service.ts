import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Product } from './products.schema';
import {Model,Types} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ){}

    async create(createProductDto:CreateProductDto, sellerId: string):Promise<Product>{
        const createdProduct = new this.productModel({
            ...createProductDto,
            sellerId: new Types.ObjectId(sellerId),
        });
        return createdProduct.save();
    }

    async findById(id:string): Promise<Product>{
        const product = await this.productModel.findById(id).exec()
        if(!product){
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async findAllForHome():Promise<Product[]>{
        return this.productModel.find(
            {}, 'productName price images'
        )
        .lean()
        .exec()
    }

    async deleteProduct(sellerId:string, productId:string):Promise<{message:string}>{
        const product = await this.productModel.findById(productId);
        if(!product){
            throw new NotFoundException('Product not found');
        }
        if(product.sellerId.toString() !== sellerId){
            throw new UnauthorizedException('You are not autherized to delete this product');
        }
        await product.deleteOne();
        return {
            message: 'Product deleted successfully'
        }
    }
    async updateProduct(sellerId:string, productId:string, updateProductDto:UpdateProductDto):Promise<Product>{
        const product = await this.productModel.findById(productId);
        if(!product){
            throw new NotFoundException('Product not found');
        }
        if(product.sellerId.toString() !== sellerId){
            throw new ForbiddenException('You are not authorized to update this product');
        }
        Object.assign(product,updateProductDto)
        return product.save();
    }
}