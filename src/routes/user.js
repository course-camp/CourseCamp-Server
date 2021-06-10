const router = require("express").Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");
const { upload } = require("../services/MulterService");

router.post("/add", UserController.addUser);

router.get("/me", auth, UserController.getProfile);

router.patch("/me", auth, UserController.updateProfile);

router.get("/me/logout", auth, UserController.logout);

router.get("/id/:userId", auth, UserController.getProfileById);

router.get("/username/:username", auth, UserController.getProfileByUsername);

router.post("/me/follow/:userId", auth, UserController.follow);

router.delete("/me/unfollow/:userId", auth, UserController.unfollow);

router.get("/me/following", auth, UserController.getFollowing);

router.get("/me/followers", auth, UserController.getFollowers);

router.patch("/me/interests", auth, UserController.updateInterests);

router.delete("/me/interests", auth, UserController.deleteInterests);

router.get("/me/reviews", auth, UserController.getReviews);

router.get("/me/courses", auth, UserController.getPublishedCourses);

router.post("/me/avatar", auth, upload, UserController.uploadUserAvatar);

router.delete("/me/avatar", auth, UserController.deleteUserAvatar);
//TODO: Routes
// router.delete("/me",auth);

module.exports = router;
