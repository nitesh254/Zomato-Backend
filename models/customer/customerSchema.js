const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const customerSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    userType: {
      type: String,
      enum: ["customer"],
      default: "customer",
    },
    addresses: [addressSchema],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
