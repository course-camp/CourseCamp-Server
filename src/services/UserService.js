const mongoose = require("mongoose");
const User = require("../models/User");
const JWTService = require("./JWTService");
const AxiosService = require("./AxiosService");
const { getFollowers, getFollowing } = require("../db/aggregation").followers;
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
      const arrayUpdates = ["interests", "recommended"];
      if (user) {
        await Promise.all(
          Object.keys(updates).map(async (key) => {
            if (arrayUpdates.includes(key)) {
              return updates[key].map((value) => {
                const index = user[key].indexOf(value);
                if (index < 0 && addToArray) return user[key].push(value);
                else if (index >= 0 && !addToArray)
                  return user[key].splice(index, 1);
              });
            } else if (key === "username") {
              const isPresent = await User.findOne({ username: updates[key] });
              if (isPresent) {
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

  static async getVirtualByPath(user, path, options, select) {
    try {
      select = select ? select : "-_id -__v";
      await user.populate({ path, options, select }).execPopulate();
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

  static async getFollowing(userId, options) {
    try {
      const { limit, skip, sort } = options;
      const following = await User.aggregate(
        await getFollowing(userId, limit, skip, sort)
      ).exec();
      return following;
    } catch (error) {
      throw error;
    }
  }

  static async getFollowers(userId, options) {
    try {
      const { limit, skip, sort } = options;
      const followers = await User.aggregate(
        await getFollowers(userId, limit, skip, sort)
      ).exec();
      return followers;
    } catch (error) {
      throw error;
    }
  }

  static async removeAvatarIfExists(userId, userDoc) {
    try {
      const user = userDoc || User.findById(userId);
      if (user.avatar) {
        await AxiosService.deleteFile(user.avatar);
        return await User.updateOne({ _id: userId }, { $unset: { avatar: 1 } });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
