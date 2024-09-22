const express = require("express");
const router = express.Router();

// Models
const Scores = require("../models/scores");

// Get all scores
router.get("/", async (req, res) => {
  try {
    const scoreData = await Scores.find();
    res.json(scoreData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one score by id
router.get("/:id", getScore, (req, res) => {
  res.send(res.score);
});

// Remove score
router.delete("/:id", getScore, async (req, res) => {
  try {
    await res.score.deleteOne();
    res.json({ message: "Score deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get scores by id
async function getScore(req, res, next) {
  let score;
  try {
    score = await Scores.findById(req.params.id);
    if (score == null) {
      return res.status(404).json({ message: "Score not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.score = score;
  next();
}

router.patch("/:id", getScore, async (req, res, next) => {
  if (req.body.player != null) {
    res.score.player_id = req.body.player;
  }
  if (req.body.game != null) {
    res.score.game_id = req.body.game;
  }
  if (req.body.date != null) {
    res.score.date = req.body.date;
  }
  if (req.body.score != null) {
    res.score.score = req.body.score;
  }
  if (req.body.place != null) {
    res.score.place = req.body.place;
  }
  try {
    const updatedScore = await res.score.save();
    res.json(updatedScore);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Add score
router.post("/", async (req, res) => {
  const score = new Scores({
    player_id: req.body.player,
    game_id: req.body.game,
    date: req.body.date,
    score: req.body.score,
    place: req.body.place
  });

  try {
    const newScore = await score.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
