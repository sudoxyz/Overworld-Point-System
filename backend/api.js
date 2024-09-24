// Entry Point of the API Server
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Connect to the database
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', (error) => console.log("Connected to Database!"));
app.use(express.json());

// Routes
const studentRouter = require("./routes/Students");
app.use("/students", studentRouter);

const notesRouter = require("./routes/Notes");
app.use("/notes", notesRouter);

// Start the server
app.listen(process.env.PORT, function () {
  console.log(`=> app listening on port ${process.env.PORT}`);
});
