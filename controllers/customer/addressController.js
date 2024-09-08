const asyncHandler = require("express-async-handler");
const Customer = require("../../models/customer/customerSchema");

//@desc Add an address to a customer
//@route POST /api/customers/:customerId/addresses
//@access private
const addAddress = asyncHandler(async (req, res) => {
    let customerId = req.params.id;
    
    // Check if the customerId provided is in the format of MongoDB ObjectId
    if (!customerId?.match(/^[0-9a-fA-F]{24}$/)) 
    {
        // If not, treat it as a username and find the customer by username
        const customer = await Customer.findOne({ _id: customerId });
        if (!customer) {
            res.status(404);
            throw new Error("Customer not found");
        }
        customerId = customer._id;
    }
  
    const { street, city, state } = req.body;
  
    const customer = await Customer.findById(customerId);
  
    if (!customer) {
        res.status(404);
        throw new Error("Customer not found");
    }
  
    const newAddress = {
        street,
        city,
        state,
    };
  
    customer.addresses.push(newAddress);
    await customer.save();
  
    res.status(201).json({ message: "Address added successfully", address: newAddress });
});

const editAddressById = asyncHandler(async (req, res) => {
  const addressId = req.params.id; // Corrected parameter name
  const { street, city, state } = req.body;

  try {
      const customers = await Customer.find();

      let updatedAddress;

      customers.forEach(async (customer) => {
          const addressIndex = customer.addresses.findIndex(address => address._id === addressId);

          if (addressIndex !== -1) {
              customer.addresses[addressIndex].street = street;
              customer.addresses[addressIndex].city = city;
              customer.addresses[addressIndex].state = state;
              updatedAddress = await customer.save();
          }
      });

      if (!updatedAddress) {
          return res.status(404).json({ message: 'Address not found' });
      }

      res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
  } catch (error) {
      console.error('Error updating address:', error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { addAddress, editAddressById };
