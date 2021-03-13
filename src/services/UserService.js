const mongoose = require("mongoose");
const User = require("../models/User");
const JWTService = require("./JWTService");
const { HTTP404Error, HTTP400Error } = require("../helpers/error");

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
  static async getUserByUsername(username) {
    try {
      const user = await User.findOne({ username });
      if (user) return user;
      throw new HTTP404Error("No user record found.");
    } catch (error) {
      throw error;
    }
  }
  static async updateUserById(userId, updates, addToArray, userDoc) {
    try {
      const user = userDoc || (await User.findById(userId));
      if (user) {
        await Promise.all(
          Object.keys(updates).map(async (key) => {
            if (
              ["interests", "publishedCourses", "recommended"].includes(key)
            ) {
              return updates[key].map((value) => {
                const index = user[key].indexOf(value);
                if (!(index >= 0) && addToArray) return user[key].push(value);
                else if (index >= 0 && !addToArray)
                  return user[key].splice(index, 1);
              });
            }
            if (key === "username") {
              const checkIfPresent = await User.findOne({
                username: updates[key],
              });
              if (checkIfPresent) {
                throw new HTTP400Error("Username already exists");
              }
            }
            return (user[key] = updates[key]);
          })
        );
        return await user.save();
      }
      throw new HTTP404Error("No user record found.");
    } catch (error) {
      throw error;
    }
  }

  static async getFollowing(user, options) {
    try {
      await user
        .populate({ path: "following", options, select: "-_id -__v" })
        .execPopulate();
      return user.following;
    } catch (error) {
      throw error;
    }
  }

  static async getVirtualByPath(user, path, options) {
    try {
      await user
        .populate({ path, options, select: "-_id -__v" })
        .execPopulate();
      return user[path];
    } catch (error) {
      throw error;
    }
  }

  static async userLogout(user) {
    try {
      user.refreshToken = null;
      await user.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
