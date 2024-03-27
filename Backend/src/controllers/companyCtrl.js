const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Company = require("../models/company.model");

const createCompany = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    address,
    companyName,
    numberOfCenters,
    companySlogan,
    companyAbout,
    openHours,
    closeHours,
    companyImage,
  } = req.body;

  try {
    // Generate new ObjectId for both user and company
    const userId = new mongoose.Types.ObjectId();
    const companyId = userId;

    const findUser = await User.findOne({
      $or: [{ companyName: companyName }, { email: email }],
    });

    if (!findUser) {
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
        address,
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
        companyImage,
      };
      await Company.create(companyData);

      res.json({ newUser, companyId, companyData });
    } else {
      // User already exists
      res.json({ msg: "User Already Exists!", success: false });
    }
  } catch (error) {
    console.error("Error creating company:", error);
    // Internal server error
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

//Get All Companies
const getAllCompanies = async (req, res) => {
  try {
    const companyAllData = await Company.find().populate(
      "user",
      "email username password"
    );

    res.json({ success: true, companyAllData });
  } catch (error) {
    // Internal server error
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

//Update A Company
const updateCompany = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ msg: "Company not found", success: false });
    }

    const userUpdate = {};
    if (req.body.email) userUpdate.email = req.body.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      userUpdate.password = hashedPassword;
    }
    if (Object.keys(userUpdate).length > 0) {
      await User.findByIdAndUpdate(company.user, userUpdate);
    }
    const updateFields = {
      companyName: req.body.companyName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      numberOfCenters: req.body.numberOfCenters,
      companySlogan: req.body.companySlogan,
      companyAbout: req.body.companyAbout,
      openHours: req.body.openHours,
      closeHours: req.body.closeHours,
      companyImage: req.body.companyImage,
    };

    // Update only provided fields
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] !== undefined) {
        company[key] = updateFields[key];
      }
    });

    const updatedCompany = await company.save();

    // Include updated email in the response
    const responseData = {
      success: true,
      updatedCompany: updatedCompany.toObject(),
    };
    if (userUpdate.email) {
      responseData.updatedCompany.email = userUpdate.email;
    }

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

//Get A Company
const getACompany = async (req, res) => {
  const { id } = req.params;

  try {
    const buyer = await Company.findById(id).populate("user", "email");

    if (!buyer) {
      return res.status(404).json({ msg: "Buyer not found", success: false });
    }

    res.json({ success: true, buyer });
  } catch (error) {
    console.error("Error fetching buyer:", error);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

//Delete A Company
const deleteCompany = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ msg: "Company not found", success: false });
    }

    const user = await User.findById(company.user);
    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }
    await User.findByIdAndDelete(company.user);

    await Company.findByIdAndDelete(companyId);

    res.json({
      success: true,
      msg: "Company and associated user deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res
      .status(500)
      .json({
        msg: "Failed to delete company",
        error: error.message,
        success: false,
      });
  }
};
module.exports = {
  createCompany,
  getAllCompanies,
  updateCompany,
  getACompany,
  deleteCompany,
};
