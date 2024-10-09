// Admin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "moderator"],
      default: "admin",
    },
    deals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deal",
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving the admin
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to check password validity
AdminSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Admin", AdminSchema);
