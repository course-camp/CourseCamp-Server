const CourseService = require("../services/CourseService");
const validator = require("../helpers/validator");
const { HTTP400Error } = require("../helpers/error");

const courseExists = async function (req, res, next) {
  try {
    const {
      params: { courseId },
    } = req;
    let { value, error } = validator.validateObjectId.validate(courseId);
    if (!error) {
      const course = await CourseService.getCourseById(value);
      req.course = course;
      return next();
    }
    throw new HTTP400Error("Invalid courseId.");
  } catch (error) {
    next(error);
  }
};

module.exports = courseExists;
