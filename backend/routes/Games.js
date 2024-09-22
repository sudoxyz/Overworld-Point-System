const express = require("express");
const router = express.Router();

// Models
const Games = require("../models/games");

// Get all games
router.get("/", async (req, res) => {
  try {
    const gameData = await Games.find();
    res.json(gameData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one games by id
router.get("/:id", getGames, (req, res) => {
  res.send(res.games.name);
});

// Remove games
router.delete("/:id", getGames, async (req, res) => {
  try {
    await res.games.deleteOne();
    res.json({ message: "games deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get games name by id
async function getGames(req, res, next) {
  let games;
  try {
    games = await Games.findById(req.params.id);
    if (games == null) {
      return res.status(404).json({ message: "games not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.games = games;
  next();
}

router.patch("/:id", getGames, async (req, res, next) => {
  if (req.body.name != null) {
    res.games.name = req.body.name;
  }
  try {
    const updatedGames = await res.games.save();
    res.json(updatedGames);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Add games
router.post("/", async (req, res) => {
  const games = new Games({
    name: req.body.name,
  });

  try {
    const newGames = await games.save();
    res.status(201).json(newGames);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
