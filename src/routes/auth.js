const router = require("express").Router();
const passport = require("passport");
const OAuthController = require("../controllers/OAuthController");
const OAuth = require("../config/config").OAuth;

router.get(
  "/google",
  passport.authenticate(OAuth.google.provider, OAuth.google.authOptions)
);

router.get("/google/callback", OAuthController.googleAuthCallback);

router.get("/google/failure", OAuthController.googleAuthFailure);

router.post("/token/refresh", OAuthController.refreshToken);

module.exports = router;
