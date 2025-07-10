import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
@Schema({timestamps:true})
export class Product extends Document {

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
      })
      sellerId: MongooseSchema.Types.ObjectId;
      

    @Prop({required:true})
    productName:string;
    
    @Prop({required:true})
    description: string;

    @Prop({required:true,min:0})
    price:number;

    @Prop({required:true,default:0,min:0})
    views: number;

    @Prop({
        required: true,
        enum: [
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
          'Office Supplies',
        ],
      })
      category: string;
    
    @Prop({
        type: [String],
        required: true,
    })
    images: string[];
    
    @Prop({required:true,default:0,min:0})
    quantity:number;

    @Prop({required:true,default:false})
    isAvailable:boolean
}
export const ProductSchema = SchemaFactory.createForClass(Product);