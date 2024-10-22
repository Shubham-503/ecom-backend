import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res, json({ message: "home routes" });
});
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", orderRoutes);

export default app;
