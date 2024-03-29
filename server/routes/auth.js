const express = require("express");
const Register = require("../controller/register");
const { Validate } = require("../middleware/validate");
const { check } = require("express-validator");

const router = express.Router();

//  Register route of PostMethod

router.post(
  "/register",
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("You first name is required")
    .trim()
    .escape(),
  check("lastName")
    .not()
    .isEmpty()
    .withMessage("You last name is required")
    .trim()
    .escape(),
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 chars long"),

  Validate,
  Register
);

module.exports = router;
