
const express = require("express");
const CartRouter = express.Router();
const {
  addItemToCart,
  updateCartItem,
  getCart,
  removeCartItem,
} = require("../controllers/cart.controller");
const verifyToken = require("../middlewares/usersAuth.middleware");

// Add an item to the cart:    verifyToken,
CartRouter.post("/", addItemToCart);

// Update the quantity of an item in the cart
CartRouter.put("/update/:itemId", verifyToken, updateCartItem);

// Get the user's cart
CartRouter.get("/", verifyToken, getCart);

// Remove an item from the cart
CartRouter.delete("/remove/:itemId", verifyToken, removeCartItem);

module.exports = CartRouter;
