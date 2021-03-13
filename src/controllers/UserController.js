const UserService = require("../services/UserService");
const FollowerService = require("../services/FollowerService");
const validator = require("../helpers/validator");
const { HTTP200Success, HTTP204Success } = require("../helpers/success");
const { HTTP400Error, HTTP422Error } = require("../helpers/error");

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
  // TODO: remove followers from each Follower document in following array
  static async getFollowing(req, res, next) {
    try {
      const user = req.user;
      const options = await UserController.validatePagination(req.query);
      const following = await UserService.getVirtualByPath(
        user,
        "following",
        options
      );
      new HTTP200Success("Users followed.", { following }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
  // TODO: remove followee from each Follower document in following array
  static async getFollowers(req, res, next) {
    try {
      const user = req.user;
      const options = await UserController.validatePagination(req.query);
      const followers = await UserService.getVirtualByPath(
        user,
        "followers",
        options
      );
      new HTTP200Success("User followers.", { followers }).sendResponse(res);
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

  static async validatePagination(query) {
    let validate = {};
    const options = { limit: 10, skip: 0, sort: "createdAt" };
    if (query.limit !== undefined || query.skip !== undefined) {
      validate = validator.pagination.validate(query);
      if (!validate.error) {
        Object.keys(options).map((value) => {
          options[value] =
            validate.value[value] !== undefined
              ? validate.value[value]
              : options[value];
        });
        return options;
      }
      throw new HTTP422Error("Invalid query parameters.");
    }
    return options;
  }
}

module.exports = UserController;
