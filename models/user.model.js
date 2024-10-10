const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart", // Reference to the Cart model
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving the user
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    // generate salt:
    const salt = await bcrypt.genSalt(10);

    // generate hash pass.
    const hashPassword = await bcrypt.hash(user.password, salt);

    user.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to check if password is valid
UserSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare plain text password with hashed password
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
