import express from "express";
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
userRouter.patch("/add-favorite", authenticateToken, addFavorite);
userRouter.patch(
  "/add-to-recent/:productId",
  authenticateToken,
  addToRecentViews
);

export default userRouter;
