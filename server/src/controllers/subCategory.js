import SubCategory, { validateSubCategory } from '../models/SubCategory.js';
import { logError } from '../util/logging.js';
import validationErrorMessage from '../util/validationErrorMessage.js';

export const getSubCategories = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const subCategories = await SubCategory.find({ category: categoryId });
    res.status(200).json({ success: true, result: subCategories });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: 'Unable to get subCategories, try again later',
    });
  }
};

export const createSubCategory = async (req, res) => {
  try {
    const subCategory = req.body;

    if (typeof subCategory !== 'object') {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'subCategory' object. Received: ${JSON.stringify(
          subCategory,
        )}`,
      });

      return;
    }
    const errorList = validateSubCategory(subCategory);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newSubCategory = await SubCategory.create(subCategory);

      res.status(201).json({ success: true, subCategory: newSubCategory });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: 'Unable to create subCategory, try again later',
    });
  }
};
