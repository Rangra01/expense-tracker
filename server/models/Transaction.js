const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tags: {
      type: [String],
    },
    receipt: {
      type: String, // Cloudinary URL (later)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);