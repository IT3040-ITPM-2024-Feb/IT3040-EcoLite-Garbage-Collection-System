
const express = require('express');
const {createItem,getAllItems,sampleItem} = require('../controllers/storeCtrl')
// const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create",createItem);
router.get("/getalltest",getAllItems);
// router.post("/sample",sampleItem);


module.exports =router; 