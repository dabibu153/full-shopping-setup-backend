const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function auth(req, res, next) {
  const token = req.header("auth_token");
  if (!token) return res.send("access denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = verified._id;
    next();
  } catch (err) {
    res.send("invalid token");
  }
}

function authCart(req, res, next) {
  const token = req.body.auth_token;
  if (!token) return res.send("access denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = verified._id;
    next();
  } catch (err) {
    res.send("invalid token");
  }
}
module.exports.auth = auth;
module.exports.authCart = authCart;
