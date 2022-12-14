import express from "express";
import cors from "cors";

import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import categoryRouter from "./routes/category.js";
import subCategoryRouter from "./routes/subCategory.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subCategoryRouter);

export default app;
