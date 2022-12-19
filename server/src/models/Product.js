import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: Number,
  mainImage: { type: String, required: true },
  images: [{ type: String, required: true }],
  inStock: Number,
  description: String,
  size: String,
  color: String,
  category: { type: mongoose.ObjectId, ref: "categories" },
  brand: String,
});

const Product = mongoose.model("products", productSchema);
