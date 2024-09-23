// Entry Point of the API Server
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

// Connect to the database
mongoose.connect("mongodb://localhost/points");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', (error) => console.log("Connected to Database!"));
app.use(express.json());

app.use(cors({
  origin: '*', // Allow requests from your React app's domain
}));

// Routes
const studentRouter = require("./routes/Students");
app.use("/students", studentRouter);

const notesRouter = require("./routes/Notes");
app.use("/notes", notesRouter);

// Start the server
app.listen(3000, function () {
  console.log("app listening on port 3000");
});
