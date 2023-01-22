import mongoose from 'mongoose';
import validateAllowedFields from '../util/validateAllowedFields.js';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  inStock: { type: Number, required: true },
  description: { type: Object },
  size: String,
  color: String,
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subCategories' },
  brand: String,
  rate: Number,
});

const Product = mongoose.model('products', productSchema);

export const validateProduct = (productObject) => {
  const errorList = [];
  const allowedKeys = [
    'title',
    'price',
    'images',
    'description',
    'inStock',
    'size',
    'color',
    'subCategory',
    'brand',
    'rate',
  ];

  const validatedKeysMessage = validateAllowedFields(
    productObject,
    allowedKeys,
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (productObject.title == null) {
    errorList.push('title is a required field');
  }

  if (productObject.price == null) {
    errorList.push('price is a required field');
  }

  if (productObject.inStock == null) {
    errorList.push('inStock is a required field');
  }

  return errorList;
};

export default Product;
