const bcrypt = require('bcrypt');
const Company = require("../models/company.model");
const User = require("../models/userModel");

//Create A New Company
const createCompany = async (req, res) => {
  const {companyName ,password} = req.body;

  try {
    const findCompany = await Company.findOne({ companyName: companyName });

    if (!findCompany) {
      //Secure Password With Hashing
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({companyName, password:hashedPassword});

      // Create a new company with the associated user ID
      const companyData = { ...req.body,password: hashedPassword, user: newUser._id };
      await Company.create(companyData);
      //
      delete newUser.password;
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

//Get All Companies
const getAllCompanies = async (req, res) => {
  try {
    const companyAllData= await Company.find().populate('user', 'email username password');

    res.json({ success: true, companyAllData });

  } catch (error) {
    // Internal server error
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};



module.exports = { createCompany,getAllCompanies };
