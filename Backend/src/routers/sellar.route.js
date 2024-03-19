const express = require("express");
const {createSeller,getAllSellars,GetaSellar,updateSeller,deleteSeller} = require("../controllers/sellarCtrl");
const {subscribeToCompany} = require("../controllers/subscriptionCtrl");
const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",createSeller);
router.get("/all",authMiddleware,getAllSellars);
router.get("/:id",authMiddleware,GetaSellar);
router.put("/:id",authMiddleware,updateSeller);
router.delete("/:id",authMiddleware,deleteSeller);

//Sunscription Routes
router.post("/subscribe",subscribeToCompany);

module.exports =router;