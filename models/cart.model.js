
const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deal",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }, // Price at the time of adding to cart
});

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
