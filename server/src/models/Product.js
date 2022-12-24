import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  mainImage: { type: String, required: true },
  images: [{ type: String }],
  inStock: { type: Number, required: true },
  description: String,
  size: String,
  color: String,
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "subCategories" },
  brand: String,
});

const Product = mongoose.model("products", productSchema);

export const validateProduct = (productObject) => {
  const errorList = [];
  const allowedKeys = [
    "title",
    "price",
    "mainImage",
    "images",
    "description",
    "inStock",
    "size",
    "color",
    "category",
    "brand",
  ];

  const validatedKeysMessage = validateAllowedFields(
    productObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (productObject.title == null) {
    errorList.push("title is a required field");
  }

  if (productObject.price == null) {
    errorList.push("price is a required field");
  }

  if (productObject.inStock == null) {
    errorList.push("inStock is a required field");
  }
  if (productObject.mainImage == null) {
    errorList.push("mainImage is a required field");
  }

  return errorList;
};

export default Product;
