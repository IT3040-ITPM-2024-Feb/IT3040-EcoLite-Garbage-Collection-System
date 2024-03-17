const Sellar = require("../models/sellar.model");
const User = require("../models/userModel");

const createSellar = async (req, res) => {
  const email = req.body.email;

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const newUser = await User.create(req.body);

      // Create a new seller with the associated user ID
      const sellarData = { ...req.body, user: newUser._id };
      await Sellar.create(sellarData);

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

module.exports = { createSellar };
