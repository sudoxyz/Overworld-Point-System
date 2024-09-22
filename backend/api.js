// Entry Point of the API Server
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to the database
mongoose.connect("mongodb://localhost/tournaments");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', (error) => console.log("Connected to Database!"));
app.use(express.json());

// Routes
const playerRouter = require("./routes/Players");
app.use("/players", playerRouter);
const gamesRouter = require("./routes/Games");
app.use("/games", gamesRouter);
const scoreRouter = require("./routes/Scores");
app.use("/scores", scoreRouter);

// Start the server
app.listen(3000, function () {
  console.log("app listening on port 3000");
});
