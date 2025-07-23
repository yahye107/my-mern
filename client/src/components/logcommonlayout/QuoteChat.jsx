// src/components/QuoteChat.jsx
import { getQuoteMessagesApi } from "@/service";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { FiSend, FiX } from "react-icons/fi";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const QuoteChat = ({ quoteId, user, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!quoteId) return;

    socket.emit("join_quote", quoteId);

    const fetchMessages = async () => {
      const res = await getQuoteMessagesApi(quoteId);
      if (res.success) setMessages(res.messages);
    };
    fetchMessages();

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [quoteId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      quoteId,
      sender: user.isAdmin ? "admin" : "user",
      text: newMessage.trim(),
    };

    socket.emit("send_message", messageData);
    setNewMessage("");
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-100">
        <div>
          <h3 className="text-gray-800 font-semibold text-lg">
            Quote #{quoteId}
          </h3>
          <p className="text-xs text-gray-500">Chat with support</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => {
          const isSender = msg.sender === (user.isAdmin ? "admin" : "user");
          return (
            <div
              key={i}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-[80%] break-words ${
                  isSender
                    ? "bg-blue-500 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                <div className="text-sm">{msg.text}</div>
                <div
                  className={`text-xs mt-1 ${
                    isSender ? "text-blue-100" : "text-gray-500"
                  } text-right`}
                >
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-grow rounded-full px-4 py-3 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteChat;
