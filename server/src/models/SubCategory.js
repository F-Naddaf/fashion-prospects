import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const subCategorySchema = new mongoose.Schema({
  title: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
});

const SubCategory = mongoose.model("subCategories", subCategorySchema);
export const validateSubCategory = (subCategoryObject) => {
  const errorList = [];
  const allowedKeys = ["title", "category"];

  const validatedKeysMessage = validateAllowedFields(
    subCategoryObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (categoryObject.title == null) {
    errorList.push("title is a required field");
  }
  if (categoryObject.category == null) {
    errorList.push("category is a required field");
  }

  return errorList;
};

export default SubCategory;
