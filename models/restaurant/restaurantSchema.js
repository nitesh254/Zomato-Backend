const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please add the user email address"],
    unique: [true, "Email address already taken"],
  },
  password: {
    type: String,
    required: true,
  }, 
  is_approved: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    enum: ["restaurant"], // Only allow "restaurant" as a value for userType
    default: "restaurant",
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);

