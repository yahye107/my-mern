const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subject: String,
    priority: String,
    description: String,
    response: { type: String, default: "" },
    status: { type: String, default: "pending" }, // Pending, In Progress, Completed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", QuoteSchema);
