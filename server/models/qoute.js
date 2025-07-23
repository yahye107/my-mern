const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subject: String,
    priority: String,
    description: String,
    response: { type: String, default: "" },
    status: { type: String, default: "pending" }, // Pending, In Progress, Completed
    attachments: [
      {
        url: String,
        public_id: String,
        originalName: String, // Must match exactly
      },
    ],
    messages: [
      {
        sender: { type: String, enum: ["user", "admin"], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    // In your QuoteSchema, change:
    review: {
      text: String, // Remove enum constraint
      rating: { type: Number, min: 1, max: 5 },
      reviewedAt: { type: Date },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", QuoteSchema);
