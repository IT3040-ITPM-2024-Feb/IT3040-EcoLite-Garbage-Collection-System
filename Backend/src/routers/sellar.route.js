const express = require("express");
const {createSeller,getAllSellars,GetaSellar,updateSeller} = require("../controllers/sellarCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createSeller);
router.get("/all",authMiddleware,getAllSellars);
router.get("/:id",authMiddleware,GetaSellar);
router.put("/:id",authMiddleware,updateSeller);

module.exports =router;