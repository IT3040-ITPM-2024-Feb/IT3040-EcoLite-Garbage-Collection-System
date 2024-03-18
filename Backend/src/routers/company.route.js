const express = require("express");
const {createCompany,getAllCompanies,updateCompany} = require("../controllers/companyCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createCompany);
router.get("/all",authMiddleware,getAllCompanies);
router.put("/:id",authMiddleware,updateCompany);

module.exports =router;