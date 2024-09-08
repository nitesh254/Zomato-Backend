const Dish = require('../../models/restaurant/dishesSchema');
const asyncHandler = require('express-async-handler');

const addDish = asyncHandler(async (req, res) => {
    const { name, description, cost } = req.body;
    const restaurantId = req.params.id; // Extracting restaurantId from request parameters
    const newDish = new Dish({ restaurantId, name, description, cost });
    await newDish.save();
    res.status(201).json({ message: 'Dish added successfully', dish: newDish });
  });

  const editDish = asyncHandler(async (req, res) => {
    const { name, description, cost } = req.body;
    const dishId = req.params.id;
    
    try {
      const dish = await Dish.findById(dishId);
      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }
  
      // Update only provided fields
      if (name) dish.name = name;
      if (description) dish.description = description;
      if (cost) dish.cost = cost;
  
      await dish.save();
      res.status(200).json({ message: "Dish updated successfully", dish });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the dish", error: error.message });
    }
  });
  
 
  const deleteDish = asyncHandler(async (req, res) => {
    const dishId = req.params.id;
  
    try {
      const deletedDish = await Dish.findByIdAndDelete(dishId);
      if (!deletedDish) {
        return res.status(404).json({ message: "Dish not found" });
      }
      res.status(200).json({ message: "Dish deleted successfully", deletedDish });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the dish", error: error.message });
    }
  });
  
  // Get list of dishes by restaurant ID
const getDishesByRestaurantId = asyncHandler(async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const dishes = await Dish.find({ restaurantId });
    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching dishes", error: error.message });
  }
});
  
  module.exports = {addDish, editDish, deleteDish, getDishesByRestaurantId};
  