import { body, param, query } from "express-validator";

export const validateOrder = [
  param("id")
    .optional()
    .custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid ID format.");
      }
      return true;
    }),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer."),

  body("userId")
    .optional()
    .isMongoId()
    .withMessage("Invalid user ID format.")
    .trim()
    .escape(),

  body("products")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Products must be a non-empty array.")
    .custom((products) => {
      products.forEach((product) => {
        if (!product.productId || !product.quantity) {
          throw new Error("Each product must have a productId and a quantity.");
        }
        if (!/^[0-9a-fA-F]{24}$/.test(product.productId)) {
          throw new Error("Invalid product ID format.");
        }
        if (!Number.isInteger(product.quantity) || product.quantity <= 0) {
          throw new Error("Quantity must be a positive integer.");
        }
      });
      return true;
    }),
];
