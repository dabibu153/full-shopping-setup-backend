const express = require("express");
const router = express.Router();
const { auth } = require("./tokenauth");
const { Cart, validationCart } = require("../models/cart");

router.post("/add", auth, (req, res) => {
  const output = validationCart(req, res);
  //   if (output.error) {
  //     return res.send(output.error);
  //   }
  const new_cart_item = new Cart({
    productId: req.body.productId,
    qty: req.body.qty,
    userId: req.body.userId,
  });
  new_cart_item.save();
  res.send("Item added to cart");
});

module.exports = router;
