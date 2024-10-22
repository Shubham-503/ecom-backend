import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  updateProductDetails,
} from "../controllers/product.controller.js";
import { validateUpdateProduct } from "../middlewares/productValidation.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", validateUpdateProduct, createProduct);
router.get("/products/:id", validateUpdateProduct, getProductDetails);
router.put("/products/:id", validateUpdateProduct, updateProductDetails);
router.delete("/products/:id", validateUpdateProduct, deleteProduct);

export default router;
