const express = require("express");
const {createCompany,getAllCompanies} = require("../controllers/companyCtrl");
const router = express.Router();

router.post("/register",createCompany);
router.get("/all",getAllCompanies);

module.exports =router;