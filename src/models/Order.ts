import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: "COD" | "ONLINE";
  deliveryCharges: number;
  items: IOrderItem[];
  totalPrice: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  variant: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    paymentMethod: { type: String, enum: ["COD", "ONLINE"], required: true },
    deliveryCharges: { type: Number, required: true },
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate readable OrderID like ORD-12345
OrderSchema.pre<IOrder>("save", async function () {
  if (!this.orderId) {
    const randomNum = Math.floor(10000 + Math.random() * 90000); // 5 digit number
    this.orderId = `ORD-${randomNum}`;
  }
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
