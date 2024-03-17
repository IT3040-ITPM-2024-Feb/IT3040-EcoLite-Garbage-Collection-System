const express = require("express");
const {createSellar} = require("../controllers/sellarCtrl");
const router = express.Router();

router.post("/register",createSellar);

module.exports =router;