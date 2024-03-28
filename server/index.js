const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Auth = require("./routes/auth");
const Login = require("./routes/login");
const Profile = require("./routes/profile");

const app = express();
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 6000;
app.use(cors());

app.get("/api/home", (req, res) => {
  res.json({ message: "Hellow world" });
});
app.use("/api", Auth);
app.use("/api", Login);
app.use("/api", Profile);

const mongoDB = process.env.MONGODBURL;

mongoose.connect(mongoDB).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
});
