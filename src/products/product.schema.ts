import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    description: string;
  
    @Prop({ required: true })
    price: number;
  
    @Prop({ required: true, default: 0 })
    quantity: number;
  
    @Prop({ required: true })
    image_url: string;
  
    @Prop()
    characteristics: string;
  
    @Prop({ default: Date.now })
    created_at: Date;
  
    @Prop({ default: Date.now })
    updated_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);