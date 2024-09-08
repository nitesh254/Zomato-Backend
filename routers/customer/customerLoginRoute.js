const express = require('express');
const router = express.Router();
const customerControllers = require('../../controllers/customer/customerControllers');
const addressController = require('../../controllers/customer/addressController');
const favouritesControllers = require("../../controllers/customer/favouritesController");

router.post('/login', customerControllers.loginCustomer)

router.post('/register', customerControllers.registerCustomer)
 
router.post('/add-address/:id', addressController.addAddress)

router.put('/edit-address/:id', addressController.editAddressById)

// POST route to add favorite restaurant
router.post('/add-favorite', favouritesControllers.addFavorite);

// POST route to remove favorite restaurant
router.post('/remove-favorite', favouritesControllers.removeFavorite);

router.get('/getFavoriteRestaurant/:id', favouritesControllers.getFavoriteRestaurantNames);

module.exports = router;
