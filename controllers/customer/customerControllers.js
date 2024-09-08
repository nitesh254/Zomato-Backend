const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/customer/customerSchema");

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
    userType: "customer", // Set userType to "customer"
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
          userType: "customer", // Set userType to "customer"
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
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

module.exports = { registerCustomer, loginCustomer, currentCustomer };
