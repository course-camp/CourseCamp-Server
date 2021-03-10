const { HTTP400Error, HTTP401Error } = require("../helpers/error");
const UserService = require("../services/UserService");
const validator = require("../helpers/validator");
const {
  HTTP200Success,
  HTTP201Success,
  HTTP204Success,
} = require("../helpers/success");
const FollowerService = require("../services/FollowerService");
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
}

module.exports = UserController;
