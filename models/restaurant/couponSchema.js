const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
