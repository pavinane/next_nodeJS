const express = require("express");
const profileController = require("../controller/profile");
const { Validate, AuthenticateToken } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/profile",
  Validate,
  AuthenticateToken,
  profileController.ProfileUser
);

router.get("/profile", profileController.getAllProfile);
router.get(
  "/profile/:id",
  Validate,
  AuthenticateToken,
  profileController.getUserProfile
);
router.put(
  "/profile/:id",
  Validate,
  AuthenticateToken,
  profileController.updateProfile
);
router.patch(
  "/profile/:id",
  Validate,
  AuthenticateToken,
  profileController.upataingProfileDetails
);
router.delete("/profile/:id", Validate, profileController.userDeleteProfile);

module.exports = router;
