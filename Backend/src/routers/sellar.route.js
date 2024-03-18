const express = require("express");
const {createSeller,getAllSellars,GetaSellar} = require("../controllers/sellarCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createSeller);
router.get("/all",authMiddleware,getAllSellars);
router.get("/:id",authMiddleware,GetaSellar);

module.exports =router;