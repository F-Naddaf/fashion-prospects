import express from "express";
import {
  createProduct,
  getProducts,
  searchProducts,
  filterProducts,
  updateProduct,
  getProduct,
  deleteProduct,
} from "../controllers/product.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/create", createProduct);
productRouter.patch("/update/:id", updateProduct);
productRouter.get("/product_detail/:id", getProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/search", searchProducts);
productRouter.get("/filter", filterProducts);
export default productRouter;
