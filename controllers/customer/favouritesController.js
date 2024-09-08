const asyncHandler = require('express-async-handler');
const Customer = require('../../models/customer/customerSchema');
const Restaurant = require('../../models/restaurant/restaurantSchema');

const addFavorite = asyncHandler(async (req, res) => {
  const { customerId, restaurantId } = req.body;
  const customer = await Customer.findById(customerId);
  if (!customer) {
    res.status(404).json({ message: 'Customer not found' });
    return;
  }
  if (customer.favorites.includes(restaurantId)) {
    res.status(400).json({ message: 'Restaurant already in favorites' });
    return;
  }
  customer.favorites.push(restaurantId);
  await customer.save();
  res.status(201).json({ message: 'Restaurant added to favorites' });
});

const removeFavorite = asyncHandler(async (req, res) => {
  const { customerId, restaurantId } = req.body;
  const customer = await Customer.findById(customerId);
  if (!customer) {
    res.status(404).json({ message: 'Customer not found' });
    return;
  }
  if (!customer.favorites.includes(restaurantId)) {
    res.status(400).json({ message: 'Restaurant not in favorites' });
    return;
  }
  customer.favorites = customer.favorites.filter(id => id !== restaurantId);
  await customer.save();
  res.json({ message: 'Restaurant removed from favorites' });
});

const getFavoriteRestaurantNames = asyncHandler(async (req, res) => {
    const { customerId } = req.params.id;
  
    try {
      // Find the customer by ID
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Extract the list of favorite restaurant IDs
      const favoriteRestaurantIds = customer.favorites;
  
      // Fetch the names of favorite restaurants
      const favoriteRestaurantNames = await Restaurant.find({ _id: { $in: favoriteRestaurantIds } })
        .select('name');
  
      // If no favorite restaurants found, return an empty array
      if (favoriteRestaurantNames.length === 0) {
        return res.json({ message: 'No favorite restaurants found for this customer' });
      }
  
      res.json({ favoriteRestaurantNames });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoriteRestaurantNames
};
