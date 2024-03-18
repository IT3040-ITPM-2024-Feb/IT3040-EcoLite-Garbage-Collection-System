const express = require("express");
const {createSellar,getAllSellars} = require("../controllers/sellarCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createSellar);
router.get("/all",authMiddleware,getAllSellars);

module.exports =router;