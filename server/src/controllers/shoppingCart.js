import User from "../models/User.js";
import Product from "../models/Product.js";
import { logError, logInfo } from "../util/logging.js";

export const addToShoppingCart = async (req, res) => {
  const email = req.user;
  const { productId } = req.params;

  const product = await Product.find({ _id: productId })
    .populate({ path: "subCategory", select: "title category categoryTitle" })
    .exec();

  const category = product[0]?.subCategory?.categoryTitle;
  const subCategory = product[0]?.subCategory?.title;

  const user = await User.find({ email: email });
  const isProductInTheCart = user[0].shoppingCart?.some(
    (item) => item.productId.toString() === productId
  );
  if (isProductInTheCart) {
    try {
      await User.findOneAndUpdate(
        { email: email },
        { $inc: { "shoppingCart.$[item].amount": 1 } },
        { arrayFilters: [{ "item.productId": productId }] }
      );
      const updatedUser = await User.find(
        { email: email },
        { password: false }
      );
      res.status(200).json({ success: true, result: updatedUser });
    } catch (error) {
      logError(error);
      res.status(500).json({
        success: false,
        msg: "Unable to update shopping cart, try again later",
      });
    }
  } else {
    try {
      await User.findOneAndUpdate(
        { email: email },
        {
          $push: {
            shoppingCart: {
              productId,
              amount: 1,
              category,
              subCategory,
            },
          },
        }
      );
      const updatedUser = await User.find(
        { email: email },
        { password: false }
      );
      res.status(200).json({ success: true, result: updatedUser });
    } catch (error) {
      logError(error);
      res.status(500).json({
        success: false,
        msg: "Unable to update shopping cart, try again later",
      });
    }
  }
};

export const decreaseAmountOfProduct = async (req, res) => {
  const email = req.user;
  const { productId } = req.params;

  const user = await User.find({ email: email });
  const product = user[0]?.shoppingCart?.find(
    (item) => item.productId.toString() === productId
  );
  if (product?.amount === 1) {
    try {
      await User.findOneAndUpdate(
        { email: email },
        { $pull: { shoppingCart: { productId: productId } } }
      );
      const updatedUser = await User.find(
        { email: email },
        { password: false }
      );
      res.status(200).json({ success: true, result: updatedUser });
    } catch (error) {
      logError(error);
      res.status(500).json({
        success: false,
        msg: "Unable to update shopping cart, try again later",
      });
    }
  } else {
    try {
      await User.findOneAndUpdate(
        { email: email },
        { $inc: { "shoppingCart.$[item].amount": -1 } },
        { arrayFilters: [{ "item.productId": productId }] }
      );
      const updatedUser = await User.find(
        { email: email },
        { password: false }
      );
      res.status(200).json({ success: true, result: updatedUser });
    } catch (error) {
      logError(error);
      res.status(500).json({
        success: false,
        msg: "Unable to update shopping cart, try again later",
      });
    }
  }
};

export const deleteItemFromShoppingCart = async (req, res) => {
  const email = req.user;
  const { productId } = req.params;
  try {
    await User.findOneAndUpdate(
      { email: email },
      { $pull: { shoppingCart: { productId: productId } } }
    );
    const updatedUser = await User.find({ email: email }, { password: false });
    res.status(200).json({ success: true, result: updatedUser });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update shopping cart, try again later",
    });
  }
};
export const deleteShoppingCart = async (req, res) => {
  const email = req.user;
  try {
    await User.findOneAndUpdate({ email: email }, { shoppingCart: [] });
    const updatedUser = await User.find({ email: email }, { password: false });
    res.status(200).json({ success: true, result: updatedUser });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete shopping cart, try again later",
    });
  }
};
