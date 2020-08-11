const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const data = require("../public/data.js");

router.get("/", async (req, res) => {
  res.send(data);
});

module.exports = router;

router.get("/:id", async (req, res) => {
  const data1 = data.findOne(data._id === parseInt(req.params.id));
  res.send(data1);
});
