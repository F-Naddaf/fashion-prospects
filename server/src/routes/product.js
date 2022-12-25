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
} from "../controllers/product.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/create", createProduct);
productRouter.patch("/update/:id", updateProduct);
productRouter.get("/product_detail/:id", getProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/search", searchProducts);
productRouter.get("/filter-by-subcategory", filterProductsBySubCategory);
productRouter.get("/filter-by-category", filterProductsByCategory);
export default productRouter;
