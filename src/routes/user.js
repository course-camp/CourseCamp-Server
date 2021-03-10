const router = require("express").Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");

router.get("/me", auth, UserController.getProfile);

router.patch("/me", auth, UserController.updateProfile);

router.patch("/me/interests", auth, UserController.updateInterests);

router.delete("/me/interests", auth, UserController.deleteInterests);

router.get("/id/:userId", auth, UserController.getProfileById);

router.get("/username/:username", auth, UserController.getProfileByUsername);

//TODO: Routes
// router.post("/me/follow/:userId",auth);
// router.delete("/me/unfollow/:userId",auth);
// router.delete("/me",auth);
// router.post("/users/me/avatar",auth);
// router.get("/users/me/avatar",auth);
// router.delete("/users/me/avatar",auth);
// router.get("/users/username/:username/avatar", auth);
// router.get("/users/id/:userId/avatar", auth);

module.exports = router;
