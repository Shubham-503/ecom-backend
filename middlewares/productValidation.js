import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

/**
 * Middleware to validate product update requests.
 */
export const validateUpdateProduct = [
  // Validate the ID parameter
  param("id")
    .optional()
    .custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid product ID format.");
      }
      return true;
    }),

  // Validate the request body fields if they are provided
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string.")
    .isLength({ min: 1 })
    .withMessage("Name cannot be empty."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string.")
    .isLength({ min: 1 })
    .withMessage("Description cannot be empty."),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number.")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Price must be a positive number.");
      }
      return true;
    }),

  body("stock")
    .optional()
    .isInt({ gt: -1 })
    .withMessage("Stock must be a non-negative integer."),

  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
