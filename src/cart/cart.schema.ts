
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProductDocument } from 'src/products/product.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product_id: ProductDocument;

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);