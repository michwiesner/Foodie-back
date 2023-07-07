import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  price: number;

  @Prop()
  idMeal: string;

  @Prop()
  strMealThumb: string;

  @Prop()
  strMeal: string;

  @Prop()
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
