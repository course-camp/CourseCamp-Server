const { HTTP409Error, HTTP404Error } = require("../helpers/error");
const Course = require("../models/Course");
const AxiosService = require("../services/AxiosService");

class CourseService {
  static async addCourse(course) {
    try {
      const isPresent = await Course.findOne({ courseURL: course.courseURL });
      if (!isPresent) {
        const newCourse = new Course(course);
        return await newCourse.save();
      }
      throw new HTTP409Error("Course already exists.");
    } catch (error) {
      throw error;
    }
  }

  static async getCourseById(courseId) {
    try {
      const course = await Course.findById(courseId);
      if (course) return course;
      throw new HTTP404Error("Course not found.");
    } catch (error) {
      throw error;
    }
  }

  static async getAllCourses(queryOpts) {
    try {
      const { limit, skip, sort } = queryOpts;
      return await Course.find({}, { recommendedBy: 0, __v: 0 })
        .limit(limit)
        .skip(skip)
        .sort(sort);
    } catch (error) {
      throw error;
    }
  }

  static async deleteCourseById(courseId) {
    try {
      const course = await Course.findById(courseId);
      if (course) {
        if (course.isVerified)
          throw new HTTP409Error("Cannot delete a verified course.");
        return await course.deleteOne({ _id: courseId });
      }
      throw new HTTP404Error("Course not found.");
    } catch (error) {
      throw error;
    }
  }

  static async updateCourseById(courseId, updates, addToArray, courseDoc) {
    try {
      const course = courseDoc || (await Course.findById(courseId));
      const arrayUpdates = ["tags"];
      if (course) {
        if (course.isVerified)
          throw new HTTP409Error("Cannot update a verified course.");
        await Promise.all(
          Object.keys(updates).map((key) => {
            if (arrayUpdates.includes(key)) {
              return updates[key].map((value) => {
                const index = course[key].indexOf(key);
                if (index < 0 && addToArray) course[key].push(value);
                else if (index >= 0 && !addToArray) {
                  return course[key].splice(index, 1);
                }
              });
            }
            return (course[key] = updates[key]);
          })
        );
        return await course.save();
      }
      throw new HTTP404Error("Course not found.");
    } catch (error) {
      throw error;
    }
  }
  static async getVirtualByPath(course, path, options, select) {
    try {
      await course.populate({ path, options, select }).execPopulate();
      return course[path];
    } catch (error) {
      throw error;
    }
  }

  static async updateCourseRecommendCount(courseId, inc, courseDoc) {
    try {
      const course = courseDoc || (await Course.findById(courseId));
      if (course) {
        course["recommendCount"] += inc ? +1 : -1;
        return await course.save();
      }
      throw new HTTP404Error("Course not found.");
    } catch (error) {
      throw error;
    }
  }

  static async removeImageIfExists(courseId, courseDoc) {
    try {
      const course = courseDoc || (await CourseService.getCourseById(courseId));
      if (course.courseImage) {
        await AxiosService.deleteFile(course.courseImage);
        return await Course.updateOne(
          { _id: courseId },
          { $unset: { courseImage: 1 } }
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = CourseService;
