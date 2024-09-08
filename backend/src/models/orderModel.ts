import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IOrderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrder extends Document {
  userId: ObjectId | string;
  orderItems: [IOrderItem];
  total: number;
  address: string;
}

const IOrderItemSchema = new Schema<IOrderItem>({
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [IOrderItemSchema],
  total: { type: Number, required: true },
  address: { type: String, required: true },
});

export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);
