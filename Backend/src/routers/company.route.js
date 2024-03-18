const express = require("express");
const {createCompany,getAllCompanies} = require("../controllers/companyCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createCompany);
router.get("/all",authMiddleware,getAllCompanies);

module.exports =router;