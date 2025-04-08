const Quote = require("../models/qoute");

// Create a new quote (user side)
const createQuote = async (req, res) => {
  try {
    const { subject, priority, description, userId } = req.body;

    const newQuote = new Quote({
      userId, // assuming user info is attached via authentication middleware
      subject,
      priority,
      description,
    });

    await newQuote.save();
    res.status(201).json({ success: true, quote: newQuote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
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
    const quotes = await Quote.find().populate("userId", "name email");
    res.status(200).json({ success: true, quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch quotes" });
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
};
