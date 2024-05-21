import mongoose, { Schema, Document } from "mongoose";

interface IVariant {
  type: string;
  value: string;
}

interface IInventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  variants: {
    type: [
      {
        type: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    default: [],
  },
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
});

const product = mongoose.model<IProduct>("Product", ProductSchema);

export default product;
