const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth").OAuth2Strategy;
const OAuthController = require("../controllers/OAuthController");
const OAuth = require("./config").OAuth;

passport.use(
  new GoogleStratergy(
    OAuth.google.stratergOptions,
    OAuthController.googleVerifyCallback
  )
);
