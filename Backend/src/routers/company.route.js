const express = require("express");
const {createCompany} = require("../controllers/companyCtrl");
const router = express.Router();

router.post("/register",createCompany);

module.exports =router;