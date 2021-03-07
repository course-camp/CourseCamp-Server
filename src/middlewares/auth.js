const JWTService = require("../services/JWTService");
const UserService = require("../services/UserService");

const auth = function (req, res, next) {
  try {
    const bearerToken = req.headers["authorization"];
    let user = JWTService.verifyBearerToken(bearerToken);
    user = UserService.getUserById(user.userId);
    res.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
