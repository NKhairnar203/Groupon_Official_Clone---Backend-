const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
