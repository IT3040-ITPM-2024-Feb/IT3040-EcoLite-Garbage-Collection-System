const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 4000;
dbConnect();


app.listen(PORT ,() =>{
    console.log(`Server is running on PORT ${PORT}`)
});