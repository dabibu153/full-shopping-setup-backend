const express = require("express");
const router = express.Router();
const { auth, authCart } = require("./tokenauth");
const { Cart, validationCart } = require("../models/cart");

router.post("/", authCart, async (req, res) => {
  const cart = await Cart.find({ userId: req.body.userId });

  res.send(cart);
});

router.post("/add", auth, async (req, res) => {
  const new_cart_item = new Cart({
    productId: req.body.productId,
    qty: req.body.qty,
    userId: req.body.userId,
  });
  await new_cart_item.save();
  res.send("Item added to cart");
});

module.exports = router;
