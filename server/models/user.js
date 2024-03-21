const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "Your First Name is required",
      max: 25,
    },
    lastName: {
      type: String,
      required: "Your Last Name is required",
      max: 25,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      lowerCase: true,
    },
    password: {
      type: String,
      require: "Password is rrequired",
      select: false,
      max: 25,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) next(err);

      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("user", UserSchema);
