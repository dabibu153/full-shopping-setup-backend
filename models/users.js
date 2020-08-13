const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

const User = new mongoose.model("User", userSchema);

function validation(req, res) {
  const schema = Joi.object({
    userName: Joi.string().required().min(6),
    email: Joi.string().required().email().min(6),
    password: Joi.string().required().min(6),
  });

  return (result = schema.validate(req.body));
}

function validationLogin(req, res) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(6),
    password: Joi.string().required().min(6),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send("bad input for login");
    return;
  }
}

module.exports.User = User;
module.exports.validation = validation;
module.exports.validationLogin = validationLogin;
