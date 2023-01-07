import express from "express";
import {
  createProduct,
  getProducts,
  searchProducts,
  updateProduct,
  getProduct,
  deleteProduct,
  filterProductsByCategory,
  filterProductsBySubCategory,
  getRecentViewsProducts,
  getFavoriteProducts,
} from "../controllers/product.js";
import { authenticateToken } from "../controllers/user.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/create", createProduct);
productRouter.patch("/update/:id", updateProduct);
productRouter.get("/product_detail/:id", getProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/search", searchProducts);
productRouter.get(
  "/filter-by-subcategory/:subCategoryId",
  filterProductsBySubCategory
);
productRouter.get("/filter-by-category/:categoryId", filterProductsByCategory);
productRouter.get("/recent-views", authenticateToken, getRecentViewsProducts);
productRouter.get("/favorites", authenticateToken, getFavoriteProducts);
export default productRouter;
