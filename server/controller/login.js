const bcrypt = require("bcrypt");
const User = require("../models/user");

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Authentication is failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const { ...user_data } = user._doc;

    res.status(200).json({
      message: "Login Successfully",

      data: [user_data.lastName, user_data.firstName],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Authentication failed" });
  }
}

module.exports = { Login };
