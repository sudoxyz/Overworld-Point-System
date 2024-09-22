const express = require("express");
const router = express.Router();

// Models
const Players = require("../models/players");

// Get all players
router.get("/", async (req, res) => {
  try {
    const playerdata = await Players.find();
    res.json(playerdata);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one player by id
router.get("/:id", getPlayer, (req, res) => {
  res.send(res.player.name);
});

// Remove player
router.delete("/:id", getPlayer, async (req, res) => {
  try {
    await res.player.deleteOne();
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get players name by id
async function getPlayer(req, res, next) {
  let player;
  try {
    player = await Players.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: "Player not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.player = player;
  next();
}

router.patch("/:id", getPlayer, async (req, res, next) => {
  if (req.body.name != null) {
    res.player.name = req.body.name;
  }
  try {
    const updatedPlayer = await res.player.save();
    res.json(updatedPlayer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Add player
router.post("/", async (req, res) => {
  const player = new Players({
    name: req.body.name,
  });

  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
