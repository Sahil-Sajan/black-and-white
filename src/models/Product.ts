import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";
import { Brand } from "@/src/types/brand";

export interface IVariant {
  name: string;
  image: string | null;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  brand: Brand | string;
  category: string;
  mg: string;
  price: number;
  description: string;
  mainImage: string | null;
  isInStock: boolean;
  variants: IVariant[];
}

const VariantSchema = new Schema<IVariant>({
  name: { type: String, required: false, default: "" },
  image: { type: String, default: null },
});

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    brand: { type: String, required: true, enum: Object.values(Brand) },
    category: { type: String, required: true },
    mg: { type: String, required: false },
    price: { type: Number, required: true },
    description: { type: String },
    mainImage: { type: String, default: null },
    isInStock: { type: Boolean, default: true },
    variants: [VariantSchema],
  },
  { timestamps: true }
);

// Auto-generate slug before saving
ProductSchema.pre<IProduct>("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

// Clear cached model to ensure schema changes are picked up in development
if (mongoose.models.Product) {
  delete (mongoose.models as any).Product;
}

export default mongoose.model<IProduct>("Product", ProductSchema);
