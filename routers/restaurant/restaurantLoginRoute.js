const express = require('express');
const router = express.Router();
const restaurantControllers = require('../../controllers/restaurant/restaurantController'); 
const dishControllers = require("../../controllers/restaurant/dishController");
const couponControllers = require("../../controllers/restaurant/couponController");
const categoriesControllers = require("../../controllers/restaurant/categoryController");
const ordersControllers = require("../../controllers/restaurant/orderController");


router.post('/login', restaurantControllers.loginCustomer);

router.post('/register', restaurantControllers.registerCustomer);
 
router.get('/dishes/:id', dishControllers.getDishesByRestaurantId);

router.post('/add-dishes/:id', dishControllers.addDish);

router.put('/edit-dishes/:id', dishControllers.editDish);

router.delete('/delete-dish/:id', dishControllers.deleteDish);

router.get('/coupons/:id', couponControllers.getCouponsByRestaurantId);

router.post('/add-coupon', couponControllers.addCoupon);

router.put('/edit-coupon/:id', couponControllers.editCoupon);

router.delete('/delete-coupon/:id', couponControllers.deleteCoupon);

router.get('/categories', categoriesControllers.getAllCategories); 

router.post('/add-category', categoriesControllers.addCategory);

router.put('/edit-category/:id', categoriesControllers.editCategory);

router.delete('/delete-category/:id', categoriesControllers.deleteCategory);

router.get('/restaurants', restaurantControllers.getAllRestaurants); 

router.post('/create-orders', ordersControllers.createOrder);

router.put('/change-status/:id', restaurantControllers.approveRestaurant);


module.exports = router;
