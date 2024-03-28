const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: "Field Required",
  },
  role: {
    type: String,
    required: "Field Required",
    enum: ["admin", "user"],
  },
  mobileNumber: {
    type: String,
    required: "Field Required",
    max: 10,
  },
  gender: {
    type: String,
    required: "Field Required",
    enum: ["Male", "Female", "Other"],
  },
});

const UserProfile = mongoose.model("profile", ProfileSchema);
module.exports = UserProfile;

// module.exports = mongoose.model("user", UserSchema);
