const { HTTP409Error, HTTP400Error } = require("../helpers/error");
const Recommend = require("../models/Recommend");
const getRecommendedByPipeline = require("../db/aggregation/recommend/getRecommendedBy");

class RecommendService {
  static async addRecommendation(courseId, userId) {
    try {
      const isPresent = await Recommend.findOne({ courseId, userId });
      if (!isPresent) {
        return await new Recommend({ courseId, userId }).save();
      }
      throw new HTTP409Error("Cannot recommend a course twice.");
    } catch (error) {
      throw error;
    }
  }

  static async deleteRecommendation(courseId, userId) {
    try {
      const isPresent = await Recommend.findOne({ courseId, userId });
      if (isPresent) {
        return await Recommend.deleteOne({ courseId, userId });
      }
      throw new HTTP400Error("Recommendation not present.");
    } catch (error) {
      throw error;
    }
  }

  static async deleteRecommendationToCourse(courseId) {
    try {
      return await Recommend.deleteMany({ courseId });
    } catch (error) {
      throw error;
    }
  }
  static async getRecommendedBy(courseId, userId, options) {
    try {
      const { limit, skip } = options;
      const recommendeds = await Recommend.aggregate(
        await getRecommendedByPipeline(courseId, userId, limit, skip)
      ).exec();
      console.log(recommendeds);
      return recommendeds;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RecommendService;
