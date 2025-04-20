import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true }, 
    price: { type: String, required: true }, 
    color: { type: String, required: true },
    highlights: { type: String, required: true }, 
    description: { type: String, required: true }, 
    category: { type: String, required: true },
    carbon: { type: String, required: true },
    shippingCarbon: { type: String, required: true },
    imageUrl: { type: String, required: true }, 
    recycled: { type: String, default: false }, 
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
