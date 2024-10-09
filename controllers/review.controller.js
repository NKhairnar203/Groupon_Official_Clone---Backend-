const Deal = require("../models/deals.model");
const Review = require("../models/review.model");

// Add a review for a Deal
const addReview = async (req, res) => {
  try {
    const { dealId } = req.params;
    const { rating, comment } = req.body;

    const newReview = new Review({
      user: req.user.userId,
      deal: dealId,
      rating,
      comment,
    });

    await newReview.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews for a specific Deal
const getReviewsForDeal = async (req, res) => {
  try {
    const { dealId } = req.params;

    const reviews = await Review.find({ deal: dealId }).populate(
      "user",
      "username email"
    );

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { getReviewsForDeal, deleteReview, updateReview, addReview };