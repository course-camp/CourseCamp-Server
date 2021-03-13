const router = require("express").Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");

router.get("/me", auth, UserController.getProfile);

router.patch("/me", auth, UserController.updateProfile);

router.patch("/me/interests", auth, UserController.updateInterests);

router.delete("/me/interests", auth, UserController.deleteInterests);

router.get("/id/:userId", auth, UserController.getProfileById);

router.get("/username/:username", auth, UserController.getProfileByUsername);

router.post("/me/follow/:userId", auth, UserController.follow);

router.delete("/me/unfollow/:userId", auth, UserController.unfollow);

router.get("/me/following", auth, UserController.getFollowing);

router.get("/me/followers", auth, UserController.getFollowers);

router.get("/me/logout", auth, UserController.logout);
//TODO: Routes
// router.delete("/me",auth);
// router.get("/me/reviews",auth);
// router.get("/me/courses",auth);
// router.post("/me/avatar",auth);
// router.get("/me/avatar",auth);
// router.delete("/me/avatar",auth);
// router.get("/username/:username/avatar", auth);
// router.get("/id/:userId/avatar", auth);

module.exports = router;
