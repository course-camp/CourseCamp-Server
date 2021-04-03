const { HTTP400Error, HTTP409Error } = require("../helpers/error");
const Follower = require("../models/Follower");
const UserService = require("./UserService");
class FollowerService {
  static async addFollower(followee, follower) {
    try {
      if (String(followee) !== String(follower)) {
        const followExists = await Follower.findOne({ followee, follower });
        if (!followExists) {
          const followerDoc = new Follower({
            followee,
            follower,
          });
          return await followerDoc.save();
        }
        throw new HTTP409Error("Followee has been already followed.");
      }
      throw new HTTP400Error("Followee cannot be same as follower");
    } catch (error) {
      throw error;
    }
  }

  static async deleteFollower(followee, follower) {
    try {
      const followExists = await Follower.findOne({ followee, follower });
      if (followExists) {
        return await Follower.deleteOne({ followee, follower });
      }
      throw new HTTP400Error("Follower record not found.");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FollowerService;
