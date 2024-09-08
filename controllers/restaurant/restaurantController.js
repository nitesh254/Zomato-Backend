const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/restaurant/restaurantSchema");

//@desc Register a customer
//@route POST /api/users/register
//@access public
const registerCustomer = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    userType: "restaurant", // Set userType to "restaurant"
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ message: "User registered successfully", _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login customer
//@route POST /api/users/login
//@access public
const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
          userType: "restaurant", // Set userType to "restaurant"
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ message: "User logged in successfully", accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//@desc Current customer info
//@route POST /api/users/current
//@access private
const currentCustomer = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// Define the API endpoint
const getAllRestaurants = asyncHandler(async (req, res) => {
  // Aggregate pipeline to filter approved restaurants and include only username
  const approvedRestaurants = await User.aggregate([
    {
      $match: {
        is_approved: true
      }
    } 
  ]);

  res.json(approvedRestaurants);
});

const approveRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  try {
    // Find the restaurant by ID
    const restaurant = await User.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Update the restaurant's is_approved status to true
    restaurant.is_approved = true;
    await restaurant.save();

    res.json({ message: 'Restaurant approval status updated to true' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { registerCustomer, loginCustomer, currentCustomer, getAllRestaurants, approveRestaurant };
