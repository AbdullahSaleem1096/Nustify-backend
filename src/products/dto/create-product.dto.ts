import {IsMongoId, IsString, IsEnum, IsNumber, Min} from 'class-validator'
export class CreateProductDto{
    @IsMongoId({groups:['create','update']})
    sellerId: string;

    @IsString({groups:['create','update','summary']})
    productName: string;

    @IsString({groups:['create','update']})
    description:string;

    @IsNumber({},{groups:['create','update','summary']})
    @Min(0)
    price:number;

    @IsEnum([
        'Electronics',
        'Fashion',
        'Home Appliances',
        'Beauty & Health',
        'Sports & Outdoors',
        'Books',
        'Toys & Games',
        'Grocery',
        'Automotive',
        'Pet Supplies',
        'Furniture',
        'Baby Products',
        'Stationery',
        'Musical Instruments',
        'Art & Crafts',
        'Mobile Accessories',
        'Computers',
        'Office Supplies'
    ],{groups:['create','update']})
    category: string;

    @IsString({ each: true, groups:['create','update','summary'] })
    images: string[];

    @IsNumber({},{groups:['create','update']})
    @Min(0)
    quantity:number;

}