const express = require("express");
const routes = express.Router();
const {
  createQuote,
  getAllQuotes,
  respondToQuote,
  getAllQuotesbyuser,
} = require("../controlls/qoute_controll");

// User: Create a new quote
routes.post("/add", createQuote);

// Admin: Get all quotes
routes.get("/get", getAllQuotes);
routes.get("/get-by-user/:id", getAllQuotesbyuser);
// Admin: Respond to a quote
routes.post("/respond", respondToQuote);
module.exports = routes;
