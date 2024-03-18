const express = require("express");
const {createSeller,getAllSellars} = require("../controllers/sellarCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createSeller);
router.get("/all",authMiddleware,getAllSellars);

module.exports =router;