const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  qty: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Cart = new mongoose.model("Cart", cartSchema);

function validationCart(req, res) {
  const schema = Joi.object({
    productId: Joi.string().required(),
    qty: Joi.number().required(),
  });

  return (result = schema.validate(req.body));
}

module.exports.Cart = Cart;
module.exports.validationCart = validationCart;
