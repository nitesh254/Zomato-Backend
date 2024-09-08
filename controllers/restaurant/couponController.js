const asyncHandler = require('express-async-handler');
const Coupon = require('../../models/restaurant/couponSchema');

// Add a coupon
const addCoupon = asyncHandler(async (req, res) => {
  const { title, description, restaurantId, amount } = req.body;

  try {
    const newCoupon = new Coupon({ title, description, restaurantId, amount });
    await newCoupon.save();
    res.status(201).json({ message: 'Coupon added successfully', coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the coupon', error: error.message });
  }
});

// Edit a coupon
const editCoupon = asyncHandler(async (req, res) => {
    const { title, description, amount } = req.body;
    const couponId = req.params.id;
  
    try {
      const coupon = await Coupon.findById(couponId);
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
  
      // Update only provided fields
      if (title) coupon.title = title;
      if (description) coupon.description = description;
      if (amount) coupon.amount = amount;
  
      await coupon.save();
      res.status(200).json({ message: "Coupon updated successfully", coupon });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the coupon", error: error.message });
    }
  });

// Delete a coupon by ID
const deleteCoupon = asyncHandler(async (req, res) => {
    const couponId = req.params.id;
  
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
      if (!deletedCoupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      res.status(200).json({ message: "Coupon deleted successfully", deletedCoupon });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the coupon", error: error.message });
    }
  });


  const getCouponsByRestaurantId = asyncHandler(async (req, res) => {
    const restaurantId = req.params.id;
  
    try {
      const coupons = await Coupon.find({ restaurantId });
      res.status(200).json({ coupons });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching coupons", error: error.message });
    }
  });
  

module.exports = { addCoupon, editCoupon, deleteCoupon, getCouponsByRestaurantId };
