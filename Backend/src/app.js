const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const companyRoute = require("./routers/company.route");
const sellarRoute = require("./routers/sellar.route");
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/company",companyRoute);
app.use("/api/sellar",sellarRoute);

app.listen(PORT ,() =>{
    console.log(`Server is running on PORT ${PORT}`)
});