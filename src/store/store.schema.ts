// src/stores/store.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Store extends Document {

    @Prop({required:false})
    logo:string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sellerId: Types.ObjectId;

    @Prop({ required: true })
    contactEmail: string;

    @Prop({ required: true })
    contactPhone: string;

    @Prop({ default: false })
    isDeliveryEnabled: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
