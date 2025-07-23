const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoutes = require("./routes/auth_routs");
const app = express();
const connectToDB = require("./databse/db");
const qouteRoutes = require("./routes/qoute_routs");
const http = require("http");
const { Server } = require("socket.io");
const Quote = require("./models/qoute");
// 1. Connect to DB first
connectToDB();

// 2. Set up CORS before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 3. Other middlewares
app.use(express.json());
app.use(cookieParser());

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/quote", qouteRoutes);

// 5. Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a quote-specific room
  socket.on("join_quote", (quoteId) => {
    socket.join(quoteId);
    console.log(`User joined quote room: ${quoteId}`);
  });

  // Handle new messages
  socket.on("send_message", async (data) => {
    try {
      const { quoteId, sender, text } = data;

      // Save the message to the DB
      const updatedQuote = await Quote.findByIdAndUpdate(
        quoteId,
        {
          $push: {
            messages: {
              sender,
              text,
              timestamp: new Date(),
            },
          },
        },
        { new: true }
      );

      if (!updatedQuote) {
        return console.error("Quote not found for message saving.");
      }

      // Emit message to everyone in the same quote room
      io.to(quoteId).emit("receive_message", {
        sender,
        text,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
