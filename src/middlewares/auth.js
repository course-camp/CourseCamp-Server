const JWTService = require("../services/JWTService");
const UserService = require("../services/UserService");

const auth = async function (req, res, next) {
  try {
    const bearerToken = req.headers["authorization"];
    let user = JWTService.verifyBearerToken(bearerToken);
    user = await UserService.getUserById(user.userId);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
