const express = require("express");
const {createCompany,getAllCompanies,updateCompany,getACompany,deleteCompany} = require("../controllers/companyCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createCompany);
router.get("/all",authMiddleware,getAllCompanies);
router.put("/:id",authMiddleware,updateCompany);
router.get("/:id",authMiddleware,getACompany);
router.delete("/:id",authMiddleware,deleteCompany);

module.exports =router;