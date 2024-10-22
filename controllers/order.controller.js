import Order from "../models/order.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";

/******************************************************
 * @CREATEORDER
 * @route http://localhost:5000/api/v1/orders
 * @description Controller to create a new order
 * @parameters userId, products (array of objects containing productId and quantity)
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the order was created successfully
 *  - {object} order - The newly created order object
 ******************************************************/

export const createOrder = asyncHandler(async (req, res) => {
  const { userId, products } = req.body;

  if (!userId || !products || !products.length) {
    throw new CustomError(
      "Please provide user ID and at least one product",
      400
    );
  }

  const order = await Order.create({ userId, products });

  res.status(201).json({
    success: true,
    order,
  });
});

/******************************************************
 * @GETORDER
 * @route http://localhost:5000/api/v1/orders/:id
 * @description Controller to get order details by ID
 * @parameters id (Order ID) - The ID of the order to retrieve
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {object} order - The order object containing order details and product information
 ******************************************************/

export const getOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate("products.productId");

  if (!order) {
    throw new CustomError("Order not found", 404);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

/******************************************************
 * @GETUSERORDERS
 * @route http://localhost:5000/api/v1/users/:id/orders
 * @description Controller to list all orders for a user by user ID
 * @parameters id (User ID) - The ID of the user whose orders to retrieve
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {array} orders - Array of order objects for the specified user
 ******************************************************/

export const getUserOrders = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const orders = await Order.find({ userId: id }).populate(
    "products.productId"
  );

  res.status(200).json({
    success: true,
    orders,
  });
});
