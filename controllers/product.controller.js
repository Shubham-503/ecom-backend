import Product from "../models/product.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";

/******************************************************
 * @GETPRODUCTS
 * @route http://localhost:5000/api/v1/products
 * @description Controller to list all products with pagination
 * @parameters page (optional), limit (optional) - for pagination
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {array} products - Array of product objects
 *  - {number} totalProducts - Total number of products
 *  - {number} currentPage - The current page number
 *  - {number} totalPages - Total number of pages available
 ******************************************************/

export const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const products = await Product.find()
    .skip((page - 1) * limit) // Skip documents for pagination
    .limit(limit); // Limit the number of documents returned

  const totalProducts = await Product.countDocuments();

  res.status(200).json({
    success: true,
    products,
    totalProducts,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / limit),
  });
});

/******************************************************
 * @CREATEPRODUCT
 * @route http://localhost:5000/api/v1/products
 * @description Controller to create a new product
 * @parameters name, description, price, stock
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the product was created successfully
 *  - {object} product - The newly created product object
 ******************************************************/

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock } = req.body;

  if (!name || !description || !price || !stock) {
    throw new CustomError("Please fill all fields", 400);
  }

  const product = await Product.create({ name, description, price, stock });

  res.status(201).json({
    success: true,
    product,
  });
});

/******************************************************
 * @GETPRODUCT
 * @route http://localhost:5000/api/v1/products/:id
 * @description Controller to get product details by ID
 * @parameters id (Product ID) - The ID of the product to retrieve
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {object} product - The product object containing product details
 ******************************************************/

export const getProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

/******************************************************
 * @UPDATEPRODUCT
 * @route http://localhost:5000/api/v1/products/:id
 * @description Controller to update product details by ID
 * @parameters id (Product ID), name, description, price, stock (optional fields in the request body)
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the update was successful
 *  - {object} product - The updated product object
 ******************************************************/

export const updateProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;

  await product.save();

  res.status(200).json({
    success: true,
    product,
  });
});

/******************************************************
 * @DELETEPRODUCT
 * @route http://localhost:5000/api/v1/products/:id
 * @description Controller to delete a product by ID
 * @parameters id (Product ID) - The ID of the product to delete
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {string} message - Success message indicating the product was deleted
 ******************************************************/

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
