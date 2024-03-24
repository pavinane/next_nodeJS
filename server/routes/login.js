const express = require("express");
const authController = require("../controller/login");
const Validate = require("../middleware/validate");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/login",
  check("email").isEmail().withMessage("Email is required").normalizeEmail(),
  check("password").not().isEmpty(),
  Validate,
  authController.Login
);
module.exports = router;
