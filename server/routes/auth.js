const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/login"
}));

// Facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/login"
}));

// GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/login"
}));

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => res.redirect(process.env.CLIENT_URL));
});

router.get("/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
