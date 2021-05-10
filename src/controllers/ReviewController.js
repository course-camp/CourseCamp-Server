const ReviewService = require("../services/ReviewService");
const validator = require("../helpers/validator");
const { HTTP400Error } = require("../helpers/error");
const { HTTP201Success, HTTP200Success } = require("../helpers/success");
const CourseService = require("../services/CourseService");

class ReviewController {
  static async getReviewById(req, res, next) {
    try {
      const {
        params: { reviewId },
      } = req;
      const validate = validator.validateObjectId.validate(reviewId);
      if (!validate.error) {
        const review = await ReviewService.getReviewById(reviewId);
        return new HTTP200Success("Review found", { review }).sendResponse(res);
      }
      throw new HTTP400Error("Invalid reviewId.");
    } catch (error) {
      next(error);
    }
  }

  static async addReviewToCourse(req, res, next) {
    try {
      const {
        body: review,
        params: { courseId },
        user,
      } = req;
      let validate = validator.validateObjectId.validate(courseId);
      if (!validate.error) {
        const course = await CourseService.getCourseById(courseId);
        validate = validator.addAndUpdateReview.validate(review);
        if (!validate.error) {
          (review["courseId"] = course._id), (review["userId"] = user._id);
          const newReview = await ReviewService.addReview(review);
          return new HTTP201Success("Review Added.", {
            review: newReview,
          }).sendResponse(res);
        }
        throw new HTTP400Error("Invalid request body.");
      }
      throw new HTTP400Error("Invalid courseId.");
    } catch (error) {
      next(error);
    }
  }

  static async updateReviewById(req, res, next) {
    try {
      const {
        body: review,
        params: { reviewId },
      } = req;
      let validate = validator.validateObjectId.validate(reviewId);
      if (!validate.error) {
        validate = validator.addAndUpdateReview.validate(review);
        if (!validate.error) {
          const newReview = await ReviewService.updateReviewById(
            reviewId,
            validate.value
          );
          return new HTTP200Success("Review updates.", {
            review: newReview,
          }).sendResponse(res);
        }
        throw new HTTP400Error("Invalid updates.");
      }
      throw new HTTP400Error("Invalid reviewId.");
    } catch (error) {
      next(error);
    }
  }

  static async deleteReviewById(req, res, next) {
    try {
      const {
        params: { reviewId },
      } = req;
      const validate = validator.validateObjectId.validate(reviewId);
      if (!validate.error) {
        const review = await ReviewService.deleteReviewById(reviewId);
        return new HTTP200Success("Review Deleted.", { review }).sendResponse(
          res
        );
      }
      throw new HTTP400Error("Invalid reviewId.");
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ReviewController;
