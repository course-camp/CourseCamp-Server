const passport = require("passport");
const UserService = require("../services/UserService");
const OAuth = require("../config/config").OAuth;
const JWTService = require("../services/JWTService");
const {
  HTTP400Error,
  HTTP403Error,
  HTTP401Error,
} = require("../helpers/error");
class OAuthController {
  static async googleVerifyCallback(
    req,
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    try {
      const {
        displayName,
        emails: [{ value: emailId }],
      } = profile;
      let { user, status } = await UserService.findOrCreateUser({
        displayName,
        emailId,
      });
      if (status === "FOUND") {
        const refreshToken = JWTService.signRefreshToken({ userId: user._id });
        user = await UserService.updateUserById(user._id, { refreshToken });
      }
      return done(null, user, { status });
    } catch (error) {
      done(error, undefined, undefined);
    }
  }

  static async googleAuthCallback(req, res, next) {
    passport.authenticate(OAuth.google.provider, (error, user, info) => {
      if (error) {
        next(error);
      }
      if (user) {
        let statusCode = 201,
          message = "User Created";
        const accessToken = JWTService.signAccessToken({ userId: user._id });
        if (info.status === "FOUND") {
          statusCode = 200;
          info.status = "OK";
          message = "User Found";
        }
        res.status(statusCode).json({
          statusCode,
          status: info.status,
          result: "SUCCESS",
          message,
          user,
          accessToken,
        });
      }
    })(req, res);
  }
  static async refreshToken(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      if (refreshToken) {
        const payload = JWTService.verifyRefreshToken(refreshToken);
        const user = await UserService.getUserById(payload.userId);
        if (refreshToken === user.refreshToken) {
          const tokens = JWTService.generateTokens({ userId: user._id });
          await UserService.updateUserById(user._id, {
            refreshToken: tokens.refreshToken,
          });
          return res.status(200).json({
            statusCode: 200,
            status: "OK",
            result: "SUCCESS",
            message: "Reissued tokens",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
        }
        throw new HTTP403Error("Not valid refresh token.");
      }
      throw new HTTP400Error("No refresh token provided.");
    } catch (error) {
      next(error);
    }
  }

  static async googleAuthFailure(req, res, next) {
    next(new HTTP401Error("Google authentication failed."));
  }
}
module.exports = OAuthController;
