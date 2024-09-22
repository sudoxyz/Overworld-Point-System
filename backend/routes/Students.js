const express = require("express");
const router = express.Router();

// Models
const Students = require("../models/students");

// Get all Students
router.get("/", async (req, res) => {
  try {
    const Studentdata = await Students.find();
    res.json(Studentdata);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one Student by id
router.get("/:id", getStudent, (req, res) => {
  res.send(res.Student.name);
});

// Remove Student
router.delete("/:id", getStudent, async (req, res) => {
  try {
    await res.Student.deleteOne();
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Students name by id
async function getStudent(req, res, next) {
  let Student;
  try {
    Student = await Students.findById(req.params.id);
    if (Student == null) {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.Student = Student;
  next();
}

router.patch("/:id", getStudent, async (req, res, next) => {
  
  if (req.body.name != null) {
    res.Student.name = req.body.name;
  }
  if (req.body.coins != null) {
    res.Student.coins = req.body.coins;
  }
  try {
    const updatedStudent = await res.Student.save();
    res.json(updatedStudent);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Add Student
router.post("/", async (req, res) => {
  const Student = new Students({
    name: req.body.name,
    coins: req.body.coins
  });

  try {
    const newStudent = await Student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
