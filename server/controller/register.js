const User = require("../models/user");

async function Register(req, res) {
  try {
    const { firstName, lastName, email, password, mobileNumber } = req.body;
    // exiting new User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seem like account created using this firstName",
      });
    }

    // creating new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
    });

    const savedUser = await newUser.save();
    const { ...user_data } = savedUser._doc;
    console.log("newUser", savedUser);
    res.status(200).json({
      staus: "Success",
      data: [user_data],
      message: "Your account is created succcessfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal server Error",
    });
  }
}

module.exports = Register;
