import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  updateProductDetails,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", createProduct);
router.get("/products/:id", getProductDetails);
router.put("/products/:id", updateProductDetails);
router.delete("/products/:id", deleteProduct);

export default router;
