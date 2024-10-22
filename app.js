import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import redis from "redis";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const redisClient = redis.createClient();
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests, please try again later.",
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//Rate_limitter
app.use(rateLimiter);

// XSS protection
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});
// routes
app.get("/", (req, res) => {
  res, json({ message: "home routes" });
});
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", orderRoutes);

export { redisClient };
export default app;
