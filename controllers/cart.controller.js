
const Cart = require("../models/cart.model"); 
const Product = require("../models/cart.model"); 

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // assuming req.user is set by verifyToken middleware

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Check if product exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        // Update quantity if product exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // Create new cart if it doesn't exist
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart item updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
