// app.js
const express = require('express'); 
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler'); 
const Order = require("../../models/restaurant/orderSchema")
const app = express();
 

app.use(bodyParser.json());

 

// Middleware function to get order by ID
const getOrder = asyncHandler(async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.order = order;
  next();
});

// Async function to create order
const createOrder = asyncHandler(async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Async function to get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Async function to get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  res.json(res.order);
});

// Async function to update order
const updateOrder = asyncHandler(async (req, res) => {
  try {
    const { restaurant_name, restaurant_address, items, total_cost } = req.body;
    if (restaurant_name != null) {
      res.order.restaurant_name = restaurant_name;
    }
    if (restaurant_address != null) {
      res.order.restaurant_address = restaurant_address;
    }
    if (items != null) {
      res.order.items = items;
    }
    if (total_cost != null) {
      res.order.total_cost = total_cost;
    }
    await res.order.save();
    res.json(res.order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Async function to delete order
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export the functions
module.exports = {
  getOrder,
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
