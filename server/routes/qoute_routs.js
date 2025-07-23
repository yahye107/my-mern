const express = require("express");
const upload = require("../middle_ware/upload");

const routes = express.Router();
const {
  createQuote,
  getAllQuotes,
  respondToQuote,
  getAllQuotesbyuser,
  addMessage,
  getQuoteMessages,
  markAsRead,
  addQuoteReview,
  getQuoteReviews,
} = require("../controlls/qoute_controll");

// User: Create a new quote
routes.post("/add", upload.array("attachments"), createQuote);
routes.post("/:quoteId/messages", addMessage);
// GET chat history for a quote
routes.get("/:quoteId/messages", getQuoteMessages);
// routes.put("/mark-as-read/:quoteId", markAsRead);
// Admin: Get all quotes
routes.get("/get", getAllQuotes);
routes.get("/get-by-user/:id", getAllQuotesbyuser);
// Admin: Respond to a quote
routes.post("/respond", respondToQuote);
routes.post("/:quoteId/review", addQuoteReview);
routes.get("/reviews", getQuoteReviews);
module.exports = routes;
