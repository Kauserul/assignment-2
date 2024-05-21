import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}

const OrderSchema: Schema = new Schema({
  email: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const order = mongoose.model<IOrder>("Order", OrderSchema);

export default order;
