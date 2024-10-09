const mongoose = require("mongoose");

const DealsSchema = new mongoose.Schema(
  {
    ownerID:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Admin"
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number, required: true, min: 0 }, // Quantity in stock
    images: [{ type: String }], // Array of image URLs
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" },],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", DealsSchema);

module.exports = Deal;
