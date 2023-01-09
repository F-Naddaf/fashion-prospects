import mongoose from 'mongoose';
import validateAllowedFields from '../util/validateAllowedFields.js';

const subCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
  categoryTitle: { type: String, required: true },
});

const SubCategory = mongoose.model('subCategories', subCategorySchema);
export const validateSubCategory = (subCategoryObject) => {
  const errorList = [];
  const allowedKeys = ['title', 'image', 'category, categoryTitle'];

  const validatedKeysMessage = validateAllowedFields(
    subCategoryObject,
    allowedKeys,
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (subCategoryObject.title == null) {
    errorList.push('title is a required field');
  }
  if (subCategoryObject.image == null) {
    errorList.push('image is a required field');
  }
  if (subCategoryObject.category == null) {
    errorList.push('category is a required field');
  }

  return errorList;
};

export default SubCategory;
