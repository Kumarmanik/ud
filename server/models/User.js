const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  oauthID: String,
  provider: String,
  displayName: String
});

module.exports = mongoose.model("User", userSchema);
