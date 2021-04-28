const UserService = require("../services/UserService");
const FollowerService = require("../services/FollowerService");
const { fileServer } = require("../config/config");
const { validateRequestQuery } = require("../helpers/validateRequestQuery");
const validator = require("../helpers/validator");
const { deleteFile } = require("../services/MulterService");
const { HTTP200Success, HTTP204Success } = require("../helpers/success");
const { HTTP400Error } = require("../helpers/error");

class UserController {
  static getProfile(req, res, next) {
    new HTTP200Success("User profile found.", { user: req.user }).sendResponse(
      res
    );
  }

  static async updateProfile(req, res, next) {
    try {
      let user = req.user;
      const validate = validator.updateUserProfile.validate(req.body);
      if (!validate.error) {
        user = await UserService.updateUserById(
          user._id,
          validate.value,
          false,
          user
        );
        return new HTTP200Success("User profile updated.", {
          user,
        }).sendResponse(res);
      }
      throw new HTTP400Error("Invalid Updates");
    } catch (error) {
      next(error);
    }
  }

  static async updateInterests(req, res, next) {
    try {
      let user = req.user;
      const validate = validator.updateUserInterests.validate(req.body);
      if (!validate.error) {
        user = await UserService.updateUserById(
          user._id,
          validate.value,
          true,
          user
        );
        return new HTTP200Success("User interests updated.", {
          user,
        }).sendResponse(res);
      }
      throw new HTTP400Error("Invalid Updates");
    } catch (error) {
      next(error);
    }
  }
  static async deleteInterests(req, res, next) {
    try {
      let user = req.user;
      const validate = validator.updateUserInterests.validate(req.body);
      if (!validate.error) {
        user = await UserService.updateUserById(
          user._id,
          validate.value,
          false,
          user
        );
        return new HTTP200Success("User interests deleted.", {
          user,
        }).sendResponse(res);
      }
      throw new HTTP400Error("Invalid Updates");
    } catch (error) {
      next(error);
    }
  }

  static async getProfileById(req, res, next) {
    try {
      const validate = validator.validateObjectId.validate(req.params.userId);
      if (!validate.error) {
        const user = await UserService.getUserById(validate.value);
        return new HTTP200Success("User found.", { user }).sendResponse(res);
      }
      throw new HTTP400Error("Not valid userId.");
    } catch (error) {
      next(error);
    }
  }

  static async getProfileByUsername(req, res, next) {
    try {
      const validate = validator.getUserByUsername.validate(
        req.params.username
      );
      if (!validate.error) {
        const user = await UserService.getUserByUsername(validate.value);
        return new HTTP200Success("User found.", { user }).sendResponse(res);
      }
      throw new HTTP400Error("Not valid userId.");
    } catch (error) {
      next(error);
    }
  }

  static async follow(req, res, next) {
    try {
      const user = req.user;
      const validate = validator.validateObjectId.validate(req.params.userId);
      if (!validate.error) {
        const followee = validate.value;
        await UserService.getUserById(followee);
        await FollowerService.addFollower(followee, user._id);
        return new HTTP204Success("User followed.").sendResponse(res);
      }
      throw new HTTP400Error("Not valid userId.");
    } catch (error) {
      next(error);
    }
  }

  static async unfollow(req, res, next) {
    try {
      const user = req.user;
      const validate = validator.validateObjectId.validate(req.params.userId);
      if (!validate.error) {
        const followee = validate.value;
        await UserService.getUserById(followee);
        await FollowerService.deleteFollower(followee, user._id);
        return new HTTP204Success("User unfollowed.").sendResponse(res);
      }
      throw new HTTP400Error("Not valid userId.");
    } catch (error) {
      next(error);
    }
  }
  static async getFollowing(req, res, next) {
    try {
      const user = req.user;
      const allowedSorts = ["createdAt", "updatedAt"];
      const options = await validateRequestQuery(req.query, allowedSorts);
      const following = await UserService.getFollowing(user._id, options);
      new HTTP200Success("Users followed.", { following }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
  static async getFollowers(req, res, next) {
    try {
      const user = req.user;
      const allowedSorts = ["createdAt", "updatedAt"];
      const options = await validateRequestQuery(req.query, allowedSorts);
      const followers = await UserService.getFollowers(user._id, options);
      new HTTP200Success("User followers.", { followers }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
  static async getReviews(req, res, next) {
    try {
      const user = req.user;
      const allowedSorts = ["createdAt", "updatedAt"];
      const options = await validateRequestQuery(req.query, allowedSorts);
      const reviews = await UserService.getVirtualByPath(
        user,
        "reviews",
        options,
        "-__v"
      );
      new HTTP200Success("User Reviews.", { reviews }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  static async getPublishedCourses(req, res, next) {
    try {
      const user = req.user;
      const allowedSorts = ["createdAt", "updatedAt", "recommendCount"];
      const options = await validateRequestQuery(req.query, allowedSorts);
      const courses = await UserService.getVirtualByPath(
        user,
        "publishedCourses",
        options,
        "-__v"
      );
      new HTTP200Success("User published courses.", { courses }).sendResponse(
        res
      );
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      const user = req.user;
      await UserService.userLogout(user);
      new HTTP200Success("User logged out.").sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  static async uploadUserAvatar(req, res, next) {
    try {
      const { user, data } = req;
      if (!data) throw new HTTP400Error("User avatar not provided.");
      await UserService.updateUserById(
        user._id,
        { avatar: data.filename },
        false,
        user
      );
      return new HTTP200Success("Image uploaded.", {
        path: fileServer.publicRoute + "/userImages/" + req.data.filename,
      }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserAvatar(req, res, next) {
    try {
      const { user } = req;
      const result = await UserService.removeAvatarIfExists(user._id, user);
      if (result)
        return new HTTP200Success("Avatar deleted.").sendResponse(res);
      throw new HTTP400Error("User avatar not present");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
