const CourseService = require("../services/CourseService");
const validator = require("../helpers/validator");
const { validateRequestQuery } = require("../helpers/validateRequestQuery");
const { HTTP400Error } = require("../helpers/error");
const { HTTP200Success, HTTP201Success } = require("../helpers/success");

class CourseController {
  static async getAllCourses(req, res, next) {
    try {
      const allowedSorts = ["createdAt", "updatedAt", "recommendCount"];
      const options = await validateRequestQuery(req.query, allowedSorts);
      const courses = await CourseService.getAllCourses(options);
      return new HTTP200Success("Courses.", { courses }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  static async getCourseById(req, res, next) {
    try {
      const {
        params: { courseId },
      } = req;
      const validate = validator.validateObjectId.validate(courseId);
      if (!validate.error) {
        const course = await CourseService.getCourseById(courseId);
        return new HTTP200Success("Course found.", { course }).sendResponse(
          res
        );
      }
      throw new HTTP400Error("Invalid courseId.");
    } catch (error) {
      next(error);
    }
  }

  static async deleteCourseById(req, res, next) {
    try {
      const {
        params: { courseId },
      } = req;
      const validate = validator.validateObjectId.validate(courseId);
      if (!validate.error) {
        const course = await CourseService.deleteCourseById(courseId);
        return new HTTP200Success("Course deleted", { course }).sendResponse(
          res
        );
      }
      throw new HTTP400Error("Invalid courseId.");
    } catch (error) {
      next(error);
    }
  }

  static async addCourse(req, res, next) {
    try {
      const { user, body: course } = req;
      const validate = validator.createCourse.validate(course);
      if (!validate.error) {
        validate.value["publisher"] = user._id;
        const newCourse = await CourseService.addCourse(validate.value);
        return new HTTP201Success("Course added.", {
          course: newCourse,
        }).sendResponse(res);
      }
      throw new HTTP400Error("Invalid course details.");
    } catch (error) {
      next(error);
    }
  }

  static async updateCourseById(req, res, next) {
    try {
      const {
        body: updates,
        params: { courseId },
      } = req;
      let validate = validator.validateObjectId.validate(courseId);
      if (!validate.error) {
        validate = validator.updateCourse.validate(updates);
        if (!validate.error) {
          const newCourse = await CourseService.updateCourseById(
            courseId,
            validate.value,
            false
          );
          return new HTTP200Success("Course updates.", {
            course: newCourse,
          }).sendResponse(res);
        }
        throw new HTTP400Error("Invalid course updates.");
      }
      throw new HTTP400Error("Invalid courseId.");
    } catch (error) {
      next(error);
    }
  }

  static async getCourseReviews(req, res, next) {
    try {
      const {
        params: { courseId },
      } = req;
      const validate = validator.validateObjectId.validate(courseId);
      if (!validate.error) {
        const allowedSorts = ["createdAt", "updatedAt"];
        const options = await validateRequestQuery(req.query, allowedSorts);
        const course = await CourseService.getCourseById(courseId);
        const reviews = await CourseService.getVirtualByPath(
          course,
          "reviews",
          options,
          "-__v"
        );
        return new HTTP200Success("Course reviews.", { reviews }).sendResponse(
          res
        );
      }
      throw new HTTP400Error("Invalid courseId.");
      // new HTTP200Success("Course reviews.", { courses }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CourseController;
