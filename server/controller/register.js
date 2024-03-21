const User = require("../models/user");

async function Register(req, res) {
  const { firstName, lastName, email, password } = req.body;
  try {
    // creating new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // exiting new User
    const existingUser = await User.findOne({ firstName });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seem like account created using this firstName",
      });
    }

    const savedUser = await newUser.save();
    const { ...user_data } = savedUser._doc;
    res.status(200).json({
      staus: "Success",
      data: [user_data],
      message: "Your account is created succcessfully",
    });
  } catch (err) {
    res.status(500).Json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal server Error",
    });
  }
  res.end();
}

module.exports = Register;
