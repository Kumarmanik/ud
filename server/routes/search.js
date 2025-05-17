const express = require("express");
const axios = require("axios");
const Search = require("../models/Search");

const router = express.Router();

// Middleware to ensure user is authenticated
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
}

// 🔸 POST /api/search
router.post("/search", ensureAuth, async (req, res) => {
  const term = req.body.term;
  const userId = req.user.id;

  if (!term) return res.status(400).json({ message: "Search term required" });

  // Store search in DB
  await Search.create({ userId, term });

  // Call Unsplash API
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term, per_page: 20 },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });

    res.json({ term, results: response.data.results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unsplash API error" });
  }
});

// 🔸 GET /api/top-searches
router.get("/top-searches", async (req, res) => {
  const top = await Search.aggregate([
    { $group: { _id: "$term", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.json(top);
});

// 🔸 GET /api/history
router.get("/history", ensureAuth, async (req, res) => {
  const history = await Search.find({ userId: req.user.id }).sort({ timestamp: -1 });
  res.json(history);
});

module.exports = router;
