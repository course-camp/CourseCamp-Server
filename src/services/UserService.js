const mongoose = require("mongoose");
const User = require("../models/User");
const JWTService = require("./JWTService");
const { HTTP404Error } = require("../helpers/error");

class UserService {
  static async findOrCreateUser({ displayName, emailId }) {
    try {
      let user = await User.findOne({ emailId });
      if (user) return { user, status: "FOUND" };
      const _id = new mongoose.Types.ObjectId();
      user = new User({
        _id,
        displayName,
        emailId,
        refreshToken: JWTService.signRefreshToken({ userId: _id }),
      });
      return { user: await user.save(), status: "CREATED" };
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (user) return user;
      throw new HTTP404Error("No user record found.");
    } catch (error) {
      throw error;
    }
  }
  static async updateUserById(userId, updates) {
    try {
      const user = await User.findById(userId);
      if (user) {
        Object.keys(updates).map((key) => {
          user[key] = updates[key];
        });
        return await user.save();
      }
      throw new HTTP404Error("No user record found.");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
