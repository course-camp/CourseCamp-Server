const router = require("express").Router();
const CourseController = require("../controllers/CourseController");
const auth = require("../middlewares/auth");

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

module.exports = router;
