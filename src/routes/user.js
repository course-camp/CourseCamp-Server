const router = require("express").Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");

router.get("/me", auth, UserController.getProfile);

router.patch("/me", auth, UserController.updateProfile);
