const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Assuming the path is correct
const Company = require('../models/company.model'); // Assuming the path is correct

const createCompany = async (req, res) => {
  const { email, password, firstName, lastName, phone, address, companyName, numberOfCenters, companySlogan, companyAbout, openHours, closeHours, companyImage } = req.body;

  try {
    // Generate new ObjectId for both user and company
    const userId = new mongoose.Types.ObjectId();
    const companyId = userId;

    // Secure Password With Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the generated ObjectId
    const newUser = await User.create({
      _id: userId,
      email,
      password: hashedPassword,
      role: "company",
      firstName,
      lastName,
      phone,
      address
    });

    // Create the company using the same ObjectId as the user
    const companyData = {
      _id: companyId,
      user: userId,
      companyName,
      numberOfCenters,
      companySlogan,
      companyAbout,
      openHours,
      closeHours,
      companyImage
    };
    await Company.create(companyData);

    // Send response with newly created user and company data
    res.json({ newUser, companyId, companyData });
  } catch (error) {
    console.error("Error creating company:", error); // Log the error for debugging
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

const updateCompany = async (req, res) => {
  const companyId = req.params.id; 

  try {    
    // Find the company document by ID
    console.log(companyId);
    const company = await Company.findById(companyId);
    console.log(companyId);
    console.log(company);
    if (!company) {
      return res.status(404).json({ msg: "Company not found", success: false });
    }

    // Update the associated user if necessary
    const userUpdate = {};
    if (req.body.email) userUpdate.email = req.body.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      userUpdate.password = hashedPassword;
    }
    if (Object.keys(userUpdate).length > 0) {
      await User.findByIdAndUpdate(company.user, userUpdate);
    }

    // Update the company fields
    const updateFields = {
      companyName: req.body.companyName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      numberOfCenters: req.body.numberOfCenters,
      companySlogan: req.body.companySlogan,
      companyAbout: req.body.companyAbout,
      openHours: req.body.openHours,
      closeHours: req.body.closeHours,
      companyImage: req.body.companyImage
    };

    // Update only provided fields
    Object.keys(updateFields).forEach(key => {
      if (updateFields[key] !== undefined) {
        company[key] = updateFields[key];
      }
    });

    // Save the updated company
    const updatedCompany = await company.save();

    res.json({ success: true, updatedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};


module.exports = { createCompany,getAllCompanies,updateCompany };
