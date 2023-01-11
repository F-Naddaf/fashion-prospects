import express from "express";
import {
  addToShoppingCart,
  decreaseAmountOfProduct,
  deleteItemFromShoppingCart,
  deleteShoppingCart,
} from "../controllers/shoppingCart.js";
import {
  createUser,
  getUser,
  login,
  authenticateToken,
  updateUser,
  addFavorite,
  addToRecentViews,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", authenticateToken, getUser);
userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.patch("/", authenticateToken, updateUser);
userRouter.patch("/add-favorite/:productId", authenticateToken, addFavorite);
userRouter.patch(
  "/add-to-recent/:productId",
  authenticateToken,
  addToRecentViews
);
userRouter.patch(
  "/shopping-cart/add-to-cart/:productId",
  authenticateToken,
  addToShoppingCart
);
userRouter.patch(
  "/shopping-cart/decrease-amount/:productId",
  authenticateToken,
  decreaseAmountOfProduct
);
userRouter.patch(
  "/shopping-cart/delete-item/:productId",
  authenticateToken,
  deleteItemFromShoppingCart
);
userRouter.patch(
  "/shopping-cart/delete",
  authenticateToken,
  deleteShoppingCart
);
export default userRouter;
