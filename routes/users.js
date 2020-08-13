const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validation, validationLogin } = require("../models/users");

router.post("/register", async (req, res) => {
  const output = validation(req, res);
  if (output.error) {
    res.status(400).send("bad input for register");
    return;
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exists, please login");

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
  validationLogin(req, res);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("invalid password");

  res.send("login successful");
});

module.exports = router;
