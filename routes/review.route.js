const express = require("express");
const ReviewRoutes = express.Router();
const {
  addReview,
  updateReview,
  deleteReview,
  getReviewsForDeal,

} = require("../controllers/review.controller");
const verifyToken = require("../middlewares/usersAuth.middleware");

// Add a review for a product (authenticated route)
ReviewRoutes.post("/:dealId", verifyToken, addReview);

// Update a review (authenticated route)
ReviewRoutes.put("/:dealId/:reviewId", verifyToken, updateReview);

// Delete a review (authenticated route)
ReviewRoutes.delete("/:dealId/:reviewId", verifyToken, deleteReview);

// Get all reviews for a specific product
ReviewRoutes.get("/:dealId", getReviewsForDeal);

module.exports = ReviewRoutes;
