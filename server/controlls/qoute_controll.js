const Quote = require("../models/qoute");

// Create a new quote (user side)
const createQuote = async (req, res) => {
  try {
    const { subject, priority, description, userId } = req.body;

    const attachments =
      req.files?.map((file) => {
        return {
          url: file.path,
          public_id: file.filename,
          originalName: file.originalname || file._originalname || "unknown",
        };
      }) || [];

    const newQuote = new Quote({
      userId,
      subject,
      priority,
      description,
      attachments,
    });

    await newQuote.save();
    res.status(201).json({ success: true, quote: newQuote });
  } catch (error) {
    console.error("Quote creation error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
// POST /api/quotes/:quoteId/review
const addQuoteReview = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { text, rating } = req.body;

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }

    if (quote.status !== "Completed") {
      return res
        .status(400)
        .json({ success: false, message: "Quote not completed yet" });
    }

    quote.review = {
      text,
      rating,
      reviewedAt: new Date(),
    };

    await quote.save();

    res
      .status(200)
      .json({ success: true, message: "Review added successfully", quote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
const getQuoteReviews = async (req, res) => {
  try {
    const reviews = await Quote.find({
      "review.text": { $exists: true, $ne: null, $ne: "" },
      "review.rating": { $exists: true },
    })
      .select("review userId subject") // return only useful fields
      .populate("userId", "username email"); // populate user info

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve reviews",
    });
  }
};

const addMessage = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { sender, text } = req.body;

    const updateData = {
      $push: { messages: { sender, text } },
      $set: { lastMessage: new Date() },
    };

    // Increment unread count only if admin sends message
    if (sender === "admin") {
      updateData.$inc = { unreadCount: 1 };
    }

    const quote = await Quote.findByIdAndUpdate(quoteId, updateData, {
      new: true,
    });
    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }

    res.status(200).json({
      success: true,
      message: quote.messages[quote.messages.length - 1],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Add new endpoint to reset unread count

// Get all quotes by user ID
const getAllQuotesbyuser = async (req, res) => {
  const { id } = req.params; // User ID from request params

  try {
    const allQuotesByUser = await Quote.find({ userId: id });

    if (allQuotesByUser) {
      return res.status(200).json({
        success: true,
        quotesList: allQuotesByUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occurred! Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again.",
    });
  }
};

// Admin: Get all quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().populate(
      "userId",
      "username lastname firstname email "
    );
    res.status(200).json({ success: true, quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch quotes" });
  }
};
const getQuoteMessages = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.quoteId).select("messages");

    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }

    res.status(200).json({ success: true, messages: quote.messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Admin: Respond to a quote
const respondToQuote = async (req, res) => {
  try {
    const { quoteId, response } = req.body;
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }

    quote.response = response;
    quote.status = "Completed"; // mark the status as completed when responding
    await quote.save();

    res.status(200).json({ success: true, quote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  createQuote,
  getAllQuotes,
  respondToQuote,
  getAllQuotesbyuser,
  addMessage,
  getQuoteMessages,

  addQuoteReview,
  getQuoteReviews,
};
