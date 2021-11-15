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
//INDEX
app.get("/portfolio", (req, res) => {
    res.render("index.ejs");
})

//ABOUT ROUTE
app.get("/portfolio/about", async (req, res) => {
    try {
        res.json({ message: "This is my About Page"})
    } catch (error) {
        res.status(400).json(error);
    }
});

//RESUME ROUTE
app.get("/portfolio/resume", (req, res) => {
    try {
        res.json({ message: "Here is my Resume"})
    } catch (error) {
        res.status(400).json(error);
    }
});

//PORTFOLIO PAGE
app.get("/portfolio/projects", (req, res) => {
    try {
        res.json({ message: "These are my recent projects"})
    } catch (error) {
        res.status(400).json(error);
    }
});

//CONTACT PAGE
app.get("/portfolio/contact", (req, res) => {
    try {
        res.json({ message: "Here's how to contact me form" })
    } catch (error) {
        res.status(400).jason(error);
    }
});

//LISTENER
app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}`)
});