const express = require("express");
const router = express.Router();

// Models
const Coins = require("../models/coins");

// Get all coins
router.get("/", async (req, res) => {
  try {
    const coinData = await Coins.find();
    res.json(coinData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one score by id
router.get("/:id", getCoins, (req, res) => {
  res.send(res.coins);
});

// Remove score
router.delete("/:id", getCoins, async (req, res) => {
  try {
    await res.coins.deleteOne();
    res.json({ message: "Coin deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get coins by id
async function getCoins(req, res, next) {
  let coins;
  try {
    score = await COins.findById(req.params.id);
    if (coins == null) {
      return res.status(404).json({ message: "Score not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.coins = coins;
  next();
}

router.patch("/:id", getCoins, async (req, res, next) => {
  if (req.body.player != null) {
    res.coins.player_id = req.body.player;
  }
  if (req.body.game != null) {
    res.coins.game_id = req.body.game;
  }
  if (req.body.date != null) {
    res.coins.date = req.body.date;
  }
  if (req.body.coins != null) {
    res.coins.coins = req.body.coins;
  }
  if (req.body.place != null) {
    res.coins.place = req.body.place;
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
  const score = new Coins({
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