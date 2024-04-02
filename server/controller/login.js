const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const sendEmail = require("./nodemailer");

const secretKey = process.env.JWT_SECRET || "your-secret-key";

// Twilo Setup

const accountid = process.env.YOUR_ACCOUNTSID;
const authToken = process.env.YOUR_AUTHTOKEN;
const twilioClient = twilio(accountid, authToken);
const twilioPhoneNumber = process.env.YOUR_PHONENUMBER;

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function Login(req, res) {
  const { email, password, mobileNumber, loginType } = req.body;
  try {
    let user;

    if (loginType === "email") {
      user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Authentication is failed" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "1hr",
      });
      // Send Email
      const emailResult = await sendEmail(
        user,
        "Login with Email SuccessFully"
      );
      console.log("emailResult", emailResult);

      if (!emailResult.success) {
        console.error(emailResult.error);
      }

      const { ...user_data } = user._doc;

      return res.status(200).json({
        message: "Login with email Successfully",
        token,
        data: [user_data.lastName, user_data.firstName],
      });
    } else if (loginType === "mobile") {
      user = await User.findOne({ mobileNumber });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Generate OTP
      const otp = generateOTP();

      // Update user's OTP
      user.otp = otp;
      await user.save();

      // Send OTP as SMS
      await twilioClient.messages.create({
        body: `Your OTP is ${otp}`,
        from: twilioPhoneNumber,
        to: user.mobileNumber,
      });

      const { ...user_data } = user._doc;

      res.status(200).json({
        message: "Login with mobile Successfully",

        data: [user_data.lastName, user_data.firstName],
      });
    } else {
      return res.status(400).json({ message: "Invalid Login Type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Authentication failed" });
  }
}

// Verify the OTP and create token

async function VerifyOTP(req, res) {
  const { mobileNumber, otp } = req.body;
  try {
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(400).json({ error: "Invalid mobileNumber" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ error: "OTP is invalid" });
    }

    // Create Token
    const token = jwt.sign({ mobileNumber: user.mobileNumber }, secretKey, {
      expiresIn: "1hr",
    });

    // clear OTP
    user.otp = null;
    await user.save();

    return res
      .status(200)
      .json({ message: "Account created successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { Login, VerifyOTP };
