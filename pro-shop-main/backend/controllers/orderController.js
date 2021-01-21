import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && !orderItems.length) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc Fetch a single order
// @route Get /api/orders/:id
// @access Private
export const getOrderByID = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) res.json(order);
  else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update a single order to paid
// @route put /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update a single order to delivered
// @route put /api/orders/:id/deliver
// @access Private/Admin
export const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Fetch the user orders
// @route get /api/orders/myorders
// @access Private
export const getUserOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Fetch orders
// @route GET /api/orders
// @access Private/Admin
export const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  if (orders) res.json(orders);
});
