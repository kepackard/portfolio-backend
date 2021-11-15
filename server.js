// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const methodOverride = require("method-override");


//APPLICATION SETTINGS
require("dotenv").config();
const PORT = process.env.PORT || 3001

//CONFIGURE DATABASE
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

// INITIALIZE EXPRESS
const app = express();



//DATABASE CONNECTION ERROR/SUCCESS
const db = mongoose.connection;
db.on("connected", () => console.log("Connected to the ${db.name} database on port:${db.PORT}"));
db.on("disconnected", () => console.log("Disconnected from mongoDB"))
db.on("Error", (err) => console.log("Uh, oh! MongoDB had an error of ${err.message}"))

//MIDDLEWARE
app.use(express.json());
app.use(logger("dev"));
app.use(express.static("public"))
app.use(express.urlencoded({ extended:false }))
app.use(methodOverride("method"))

//CONTROLLERS
app.get("/portfolio", (req, res) => {
    res.send("Welcome to my portfolio!");
})

//LISTENER
app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}`)
});