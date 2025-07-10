import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller({path:'products',version:'1'})
export class ProductsController {
    constructor(private productService: ProductsService){}

    @Post('create-product')
    @Roles(Role.Seller)
    @UseGuards(AuthGuard)
    async create(@Body(new ValidationPipe({groups:['create']}))createProductDto: CreateProductDto): Promise<Product>{
        return await this.productService.create(createProductDto);
    }

    @Patch('update/:id')
    @Roles(Role.Seller)
    @UseGuards(AuthGuard)
    async updateProduct(
        @Param('id') id:string,
        @Body(new ValidationPipe({groups:['update']})) updateProductDto:UpdateProductDto):Promise<Product>{
            return this.productService.updateProduct(id,updateProductDto)
        }

    @Delete('delete/:id')
    @Roles(Role.Seller,Role.Admin)
    @UseGuards(AuthGuard)
    async deleteProduct(@Param('id') id : string): Promise<{message:string}>{
            return this.productService.deleteProduct(id)
    }

    @Get(':id')
    @Roles(Role.Admin,Role.Buyer,Role.Seller)
    async getProductById(@Param('id') id:string): Promise<Product>{
        return this.productService.findById(id);
    }
}

