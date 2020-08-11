const express = require("express");
const router = express.Router();
const { Product } = require("../models/products.js");

router.get("/", async (req, res) => {
  const data = await Product.find();
  res.send(data);
});

router.get("/:id", async (req, res) => {
  const data = await Product.findById(req.params.id);
  res.send(data);
});

router.post("/", async (req, res) => {
  const new_data = new Product({
    brand: req.body.brand,
    generation: req.body.generation,
    name: req.body.name,
    cores: req.body.cores,
    threads: req.body.threads,
    price: req.body.price,
    baseClock: req.body.baseClock,
    turboClock: req.body.turboClock,
  });

  await new_data.save();
  res.send("saved...");
});

module.exports = router;
