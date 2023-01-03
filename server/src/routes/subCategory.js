import express from 'express';
import {
  createSubCategory,
  getSubCategories,
} from '../controllers/subCategory.js';
const subCategoryRouter = express.Router();

subCategoryRouter.get('/:categoryId', getSubCategories);
subCategoryRouter.post('/create', createSubCategory);

export default subCategoryRouter;
