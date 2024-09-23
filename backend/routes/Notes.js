const express = require("express");
const router = express.Router();

// Models
const Notes = require("../models/notes");

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

// Add Note
router.post("/", async (req, res) => {
  const Note = new Notes({
    mentor_name: req.body.mentor_name,
    student_id: req.body.student_id,
    notes: req.body.notes,
  });

  try {
    const newNote = await Note.save();
    res.status(201).json(newNote);
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
