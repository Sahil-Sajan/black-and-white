import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";

export interface IVariant {
  name: string;
  image: string | null;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  brand: string;
  category: string;
  mg: string;
  price: number;
  description: string;
  isInStock: boolean;
  variants: IVariant[];
}

const VariantSchema = new Schema<IVariant>({
  name: { type: String, required: true },
  image: { type: String, default: null },
});

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    mg: { type: String, required: false },
    price: { type: Number, required: true },
    description: { type: String },
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

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
