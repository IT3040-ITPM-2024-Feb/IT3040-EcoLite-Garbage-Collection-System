const bcrypt = require("bcrypt");
const Sellar = require("../models/sellar.model");
const User = require("../models/userModel");

//Create A New Sellar
const createSellar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      //Secure Password With Hashing
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ email, password: hashedPassword });

      // Create a new seller with the associated user ID
      const sellarData = {
        ...req.body,
        password: hashedPassword,
        user: newUser._id,
      };
      await Sellar.create(sellarData);

      delete newUser.password;
      // Send response with newly created user and seller data
      res.json({ newUser, sellarData });
    } else {
      // User already exists
      res.json({ msg: "User Already Exists!", success: false });
    }
  } catch (error) {
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

module.exports = { createSellar, getAllSellars };
