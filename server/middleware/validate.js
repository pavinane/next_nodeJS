const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv");
const secretKey = process.env.JWT_SECRET || "your-secret-key";

const Validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = {};
    errors.array().map((err) => (error[err.param] = err.msg));
    return res.status(422).json({ error });
  }
  next();
};

function AuthenticateToken(req, res, next) {
  // const token = req.headers["authorization"];
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.error("JWT Token Expired:", err.message);
        return res.status(401).json({ error: "Token expired" });
      } else if (err.name === "JsonWebTokenError") {
        console.error("Invalid JWT Token:", err.message);
        return res.status(401).json({ error: "Invalid token" });
      } else {
        console.error("JWT Verification Error:", err.message);
        return res.sendStatus(403); // Forbidden
      }
    }
    req.user = user;
    next();
  });
}

module.exports = { Validate, AuthenticateToken };
