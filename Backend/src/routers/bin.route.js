const express = require("express");
// const {createSeller,getAllSellars,GetaSellar,updateSeller,deleteSeller} = require("../controllers/sellarCtrl");
const {createBin,getAllBins} = require('../controllers/binCtrl')
// const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create",createBin);
router.get("/getall",getAllBins);


module.exports =router; 