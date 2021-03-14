const router = require("express").Router();
const ReviewController = require("../controllers/ReviewController");
const auth = require("../middlewares/auth");

router.get("/:reviewId", auth, ReviewController.getReviewById);

router.post("/:courseId", auth, ReviewController.addReviewToCourse);

router.patch("/:reviewId", auth, ReviewController.updateReviewById);

router.delete("/:reviewId", auth, ReviewController.deleteReviewById);

// TODO: routes

module.exports = router;
