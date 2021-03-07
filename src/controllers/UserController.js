const { HTTP400Error } = require("../helpers/error");
const UserService = require("../services/UserService");
class UserController {
  static getProfile(req, res, next) {
    res.status(200).json({
      statusCode: 200,
      status: "OK",
      result: "SUCCESS",
      message: "User profile found",
      user: res.user,
    });
  }

  static async updateProfile(req, res, next) {
    const user = req.user;
    const updates = req.body;
    const updatesProps = Object.keys(updates);
    const allowedUpdates = ["username", "displayName", "interests", "summary"];
    const isValidUpdates = updatesProps.every(
      (prop) => allowedUpdates.findIndex(prop) >= 0
    );
    if (isValidUpdates) {
    }
    throw new HTTP400Error("Not valid updates");
  }
}
module.exports = UserController;
