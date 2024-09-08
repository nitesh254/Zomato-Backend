const express = require("express");
const connectDb = require("./config/dbConnection"); 
const customer = require("./routers/customer/customerLoginRoute");
// Connect to the database
connectDb();

// Create an Express application
const app = express();

// Define the port to listen on
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies of requests
app.use(express.json());

// Mount the customer login route handler
app.use("/api/customer", customer);
app.use("/api/restaurant", require("./routers/restaurant/restaurantLoginRoute.js"));
// Start the server
app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});
