const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  userId: String,
  term: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Search", searchSchema);
