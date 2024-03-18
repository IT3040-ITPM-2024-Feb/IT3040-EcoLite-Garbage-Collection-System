const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Sellar = require("../models/sellar.model");
const User = require("../models/userModel");

//Create A New Sellar
const createSeller = async (req, res) => {
  const { email, password, firstName, lastName, phone, address } = req.body;

  try {
    // Generate new ObjectId for both user and seller
    const userId = new mongoose.Types.ObjectId();
    const sellerId = userId;

    const findUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
    if(!findUser){
       // Secure Password With Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the generated ObjectId
    const newUser = await User.create({
      _id: userId,
      email,
      password: hashedPassword,
      role: "seller",
      firstName,
      lastName,
      phone,
      address
    });

    // Create the seller using the same ObjectId as the user
    const sellerData = {
      _id: sellerId,
      user: userId,
      firstName,
      lastName,
      phone,
      address
    };
    await Sellar.create(sellerData);

    // Send response with newly created user and seller data
    res.json({ newUser, sellerId, sellerData });
    }else{
       // User already exists
      res.json({ msg: "User Already Exists!", success: false });
    }
    
  } catch (error) {
    console.error("Error creating seller:", error); // Log the error for debugging
    // Internal server error
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

//Get All Sellars

const getAllSellars = async (req, res) => {
  try {
    const sellers = await Sellar.find().populate("user", "email username");

    res.json({ success: true, sellers });
  } catch (error) {
    // Internal server error
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

module.exports = { createSeller, getAllSellars };
