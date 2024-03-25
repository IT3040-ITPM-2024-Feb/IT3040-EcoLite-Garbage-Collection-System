
const express = require('express');
const {createItem,getAllItems,getAItem,updateItem,deleteItem} = require('../controllers/storeCtrl')
// const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create",createItem);
router.get("/getall",getAllItems);
router.get("/get/:id",getAItem);
router.put("/update/:id",updateItem);
router.delete("/deleteitem/:id",deleteItem);


module.exports =router; 