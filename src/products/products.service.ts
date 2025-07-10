import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.schema';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ){}

    async create(createProductDto:CreateProductDto):Promise<Product>{
        const createdProduct = new this.productModel(createProductDto);
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
        .exec();
    }

    async deleteProduct(productId:string):Promise<{message:string}>{
        const deleteProduct = await this.productModel.findByIdAndDelete(productId);
        if(!deleteProduct){
            throw new NotFoundException('Product not found');
        }
        return {
            message: 'Product deleted successfully'
        }
    }
    async updateProduct(productId:string, updateProductDto:UpdateProductDto):Promise<Product>{
        const updatedProduct = await this.productModel.findByIdAndUpdate(
            productId,
            updateProductDto,
            {new:true}
        );
        if(!updatedProduct){
            throw new NotFoundException('Product not found exception');
        }
        return updatedProduct;
    }
}