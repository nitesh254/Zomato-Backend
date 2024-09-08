const mongoose = require('mongoose');

// Define Schema
const orderSchema = new mongoose.Schema({
  restaurant_name: {
    type: String,
    required: true
  },
  restaurant_address: {
    type: String,
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total_cost: {
    type: Number,
    required: true
  }
});

// Create Model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
