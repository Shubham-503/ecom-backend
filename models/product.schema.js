import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      trim: true,
      maxLength: [500, "Product description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      validate: {
        validator: (value) => value >= 0,
        message: "Product price must be a positive number",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please provide product stock quantity"],
      validate: {
        validator: (value) => value >= 0,
        message: "Product stock must be a non-negative number",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
