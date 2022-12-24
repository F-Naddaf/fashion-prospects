import Product, { validateProduct } from "../models/Product.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "category", select: "title" })
      .exec();
    res.status(200).json({ success: true, result: products });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get products, try again later" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = req.body;

    if (typeof product !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'product' object. Received: ${JSON.stringify(
          product
        )}`,
      });

      return;
    }
    const errorList = validateProduct(product);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newProduct = await Product.create(product);

      res.status(201).json({ success: true, product: newProduct });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create product, try again later",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate({ path: "category", select: "title" })
      .exec();
    res.status(200).json({ success: true, result: product });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get product, try again later" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body);
    const updatedProduct = await Product.findById(id);
    res.status(200).json({ success: true, result: updatedProduct });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update product, try again later",
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id, req.body);
    res.status(200).json({
      success: true,
      msg: `Product with id: ${id} deleted from database`,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete product, try again later",
    });
  }
};
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { ingredients: { $regex: query, $options: "i" } },
      ],
      isAvailable: true,
    })
      .populate({ path: "category", select: "title" })
      .exec();
    res.status(200).json({ success: true, result: products });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get products, try again later" });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const { subCategoryId } = req.query;

    const products = await Product.find({
      subCategory: subCategoryId,
    })
      .populate({ path: "subCategory", select: "title category" })
      .exec();
    res.status(200).json({ success: true, result: products });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get products, try again later" });
  }
};
