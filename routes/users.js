const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { User, validation, validationLogin } = require("../models/users");

router.post("/register", async (req, res) => {
  const output = validation(req, res);
  if (output.error) {
    res.send("bad input for register");
    return;
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.send("user already exists, please login");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);

  const new_user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashed,
  });

  await new_user.save();
  res.send("user added, please login");
});

router.post("/login", async (req, res) => {
  const output = validationLogin(req, res);
  if (output.error) {
    res.send(output.error.details[0].message);
    return;
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("invalid email");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("invalid password");

  const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("auth-token", token).send("login successful");
});

module.exports = router;
