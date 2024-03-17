const Company = require("../models/company.model");

const User = require("../models/userModel");

//Create A User
const createCompany = async (req, res) => {
  const email = req.body.email;

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const newUser = await User.create(req.body);

      // Assuming sellerData is actually companyData
      const companyData = { ...req.body, user: newUser._id };
      await Company.create(companyData);

      res.json({ newUser, companyData });
    } else {
      res.json({ msg: "User Already Exists!", success: false });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

module.exports = { createCompany };
