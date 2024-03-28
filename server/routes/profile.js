const express = require("express");
const profileController = require("../controller/profile");
const Validate = require("../middleware/validate");

const router = express.Router();

router.post("/profile", Validate, profileController.ProfileUser);

router.get("/profile", profileController.getAllProfile);
router.get("/profile/:id", Validate, profileController.getUserProfile);
router.put("/profile/:id", Validate, profileController.updateProfile);

module.exports = router;
