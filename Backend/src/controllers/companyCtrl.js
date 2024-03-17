const Company = require("../models/company.model");
const User = require("../models/userModel");

//Create A New Company
const createCompany = async (req, res) => {
  const companyName = req.body.companyName;

  try {
    const findCompany = await Company.findOne({ companyName: companyName });

    if (!findCompany) {
      const newUser = await User.create(req.body);

      // Create a new company with the associated user ID
      const companyData = { ...req.body, user: newUser._id };
      await Company.create(companyData);

      // Send response with newly created user and company data
      res.json({ newUser, companyData });
    } else {
      // Company already exists
      res.json({ msg: "Company Already Exists!", success: false });
    }
  } catch (error) {
    // Internal server error
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

module.exports = { createCompany };
