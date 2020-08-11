const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: String,
  generation: String,
  name: String,
  cores: Number,
  threads: Number,
  price: Number,
  baseClock: String,
  turboClock: String,
});

const Product = new mongoose.model("Product", productSchema);

module.exports.Product = Product;
