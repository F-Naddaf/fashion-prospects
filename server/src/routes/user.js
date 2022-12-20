import express from "express";
import {
  createUser,
  getUser,
  login,
  authenticateToken,
  updateUser,
  addFavorite,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", authenticateToken, getUser);
userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.patch("/", authenticateToken, updateUser);
userRouter.patch("/add-favorite", authenticateToken, addFavorite);

export default userRouter;
