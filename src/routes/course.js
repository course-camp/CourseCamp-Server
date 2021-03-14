const router = require("express").Router();
const CourseController = require("../controllers/CourseController");
const auth = require("../middlewares/auth");

// router.get("/", auth, CourseController.getAllCourses);

router.post("/", auth, CourseController.addCourse);

router.get("/:courseId", auth, CourseController.getCourseById);

router.patch("/:courseId", auth, CourseController.updateCourseById);

router.delete("/:courseId", auth, CourseController.deleteCourseById);
// TODO: routes
// router.post("/:courseId/recommend", auth);
// router.get("/:courseId/reviews");
// router.get("/:courseId/recommends", auth);

module.exports = router;