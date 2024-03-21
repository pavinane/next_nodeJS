const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Auth = require("./routes/auth");

const app = express();
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 8000;
app.use(cors());

app.get("/api/home", (req, res) => {
  res.json({ message: "Hellow world" });
});
app.use("/api", Auth);

const mongoDB = process.env.MONGODBURL;

mongoose.connect(mongoDB).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
});
