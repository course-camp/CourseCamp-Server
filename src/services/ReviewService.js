const Review = require("../models/Review");
const { HTTP404Error, HTTP409Error } = require("../helpers/error");

class ReviewService {
  static async getReviewById(reviewId) {
    try {
      const isPresent = await Review.findById(reviewId);
      if (isPresent) return isPresent;
      throw new HTTP404Error("Review not found.");
    } catch (error) {
      throw error;
    }
  }
  static async addReview(review) {
    try {
      const isPresent = await Review.findOne({
        courseId: review.courseId,
        userId: review.userId,
      });
      if (!isPresent) {
        return await new Review(review).save();
      }
      throw new HTTP409Error("Review already present.");
    } catch (error) {
      throw error;
    }
  }

  static async updateReviewById(reviewId, review) {
    try {
      const oldReview = await Review.findById(reviewId);
      if (oldReview) {
        oldReview["review"] = review["review"];
        return await oldReview.save();
      }
      throw new HTTP404Error("Review not found.");
    } catch (error) {
      throw error;
    }
  }

  static async deleteReviewById(reviewId) {
    try {
      const isPresent = await Review.findById(reviewId);
      if (isPresent) {
        await Review.deleteOne({ _id: reviewId });
        return isPresent;
      }
      throw new HTTP404Error("Review not found.");
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ReviewService;
