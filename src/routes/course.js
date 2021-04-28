const router = require("express").Router();
const CourseController = require("../controllers/CourseController");
const auth = require("../middlewares/auth");
const courseExists = require("../middlewares/course");
const { upload } = require("../services/MulterService");

router.get("/", auth, CourseController.getAllCourses);

router.post("/", auth, CourseController.addCourse);

router.get("/:courseId", auth, CourseController.getCourseById);

router.patch("/:courseId", auth, CourseController.updateCourseById);

router.delete("/:courseId", auth, CourseController.deleteCourseById);

router.get("/:courseId/reviews", auth, CourseController.getCourseReviews);

router.post("/:courseId/recommend", auth, CourseController.addRecommendation);

router.delete(
  "/:courseId/unrecommend",
  auth,
  CourseController.deleteRecommendation
);

router.get("/:courseId/recommends", auth, CourseController.getRecommendedBy);

router.post(
  "/:courseId/image",
  auth,
  courseExists,
  upload,
  CourseController.uploadCourseImage
);

router.delete(
  "/:courseId/image",
  auth,
  courseExists,
  CourseController.deleteCourseImage
);

module.exports = router;
