const express = require("express");
const router = express.Router();

// Models
const Notes = require("../models/notes");
const Students = require("../models/students"); 

// Get student middleware
const getStudent = async (req, res, next) => {
  let student;
  try {
    student = await Students.findById(req.body.student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
};

// Get all Notes or Notes by student_id
router.get("/:id", async (req, res) => {
  try {
    const student_id = req.params.id;
    let notes;

    // Fetch notes for the specific student
    notes = await Notes.find({ student_id: student_id });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all Notes
router.get("/", async (req, res) => {
  try {
    const NoteData = await Notes.find();
    res.json(NoteData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Note and Update Coins
router.post("/", getStudent, async (req, res) => {
  const note = new Notes({
    mentor_name: req.body.mentor_name,
    student_id: req.body.student_id,
    notes: req.body.notes,
    date: Date.now(),
    coins: req.body.coins || 0,  // Include the coins added in the note
  });

  try {
    // Save the note first
    const newNote = await note.save();

    // Update the student's coins if coins field is provided
    if (req.body.coins != null) {
      res.student.coins += parseInt(req.body.coins);
      await res.student.save(); // Save updated student
    }

    res.status(201).json({ newNote, updatedStudent: res.student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove Note
router.delete("/:id", async (req, res) => {
  try {
    const student_id = req.params.id;
    let notes;

    // Fetch notes for the specific student
    notes = await Notes.findById(req.params.id);

    await notes.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
