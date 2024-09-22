// Entry Point of the API Server
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to the database
mongoose.connect("mongodb://localhost/points");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', (error) => console.log("Connected to Database!"));
app.use(express.json());

// Routes
const studentRouter = require("./routes/Students");
app.use("/students", studentRouter);

const coinsRouter = require("./routes/Coins");
app.use("/coins", coinsRouter);

// Start the server
app.listen(3000, function () {
  console.log("app listening on port 3000");
});
