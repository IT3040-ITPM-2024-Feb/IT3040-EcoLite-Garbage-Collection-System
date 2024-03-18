const express = require("express");
const {createSellar,getAllSellars} = require("../controllers/sellarCtrl");
const router = express.Router();

router.post("/register",createSellar);
router.get("/all",getAllSellars);

module.exports =router;