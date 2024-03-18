const express = require("express");
const {createCompany,getAllCompanies,updateCompany,getACompany} = require("../controllers/companyCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createCompany);
router.get("/all",authMiddleware,getAllCompanies);
router.put("/:id",authMiddleware,updateCompany);
router.get("/:id",authMiddleware,getACompany);

module.exports =router;