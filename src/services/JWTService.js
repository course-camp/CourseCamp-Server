const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const {
  accessSecret,
  refreshSecret,
  accessTokenLife,
  refreshTokenLife,
} = require("../config/config").jwt;
const { HTTP401Error, HTTP500Error } = require("../helpers/error");
class JWTService {
  static isValidPayload(payload) {
    if (
      payload &&
      typeof payload === "object" &&
      payload.hasOwnProperty("userId") &&
      ObjectId.isValid(payload.userId) &&
      String(new ObjectId(payload.userId)) === String(payload.userId)
    ) {
      return true;
    }
    return false;
  }
  static signAccessToken(payload) {
    try {
      if (this.isValidPayload(payload)) {
        return jwt.sign(payload, accessSecret, { expiresIn: accessTokenLife });
      }
      throw new Error("Not valid payload");
    } catch (error) {
      throw new HTTP500Error(error.message);
    }
  }
  static signRefreshToken(payload) {
    try {
      if (this.isValidPayload(payload)) {
        return jwt.sign(payload, refreshSecret, {
          expiresIn: refreshTokenLife,
        });
      }
      throw new APPError("Not valid payload.");
    } catch (error) {
      throw new HTTP500Error(error.message);
    }
  }
  static verifyBearerToken(bearerToken) {
    try {
      let token = null;
      if (bearerToken) {
        token = bearerToken.replace("Bearer ", "");
        if (token) {
          return jwt.verify(token, accessSecret);
        }
        throw new Error("Not valid bearer token.");
      }
      throw new Error("Bearer token not provided.");
    } catch (error) {
      throw new HTTP401Error(error.message);
    }
  }
  static verifyRefreshToken(refreshToken) {
    try {
      if (refreshToken) {
        return jwt.verify(refreshToken, refreshSecret);
      }
      throw new Error("Not valid refresh token.");
    } catch (error) {
      throw new HTTP401Error(error.message);
    }
  }
  static generateTokens(payload) {
    try {
      if (this.isValidPayload(payload)) {
        return {
          accessToken: jwt.sign(payload, accessSecret, {
            expiresIn: accessTokenLife,
          }),
          refreshToken: jwt.sign(payload, refreshSecret, {
            expiresIn: refreshTokenLife,
          }),
        };
      }
      throw new Error("Not valid payload.");
    } catch (error) {
      throw new HTTP500Error(error.message);
    }
  }
}

module.exports = JWTService;
