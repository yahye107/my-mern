import Header from "@/components/logcommonlayout/Header";
import { getuserAllQoutesApi, callSubmitReviewApi } from "@/service";
import { useUser } from "@/context/use_context";
import { useState, useEffect } from "react";
import {
  format,
  isToday,
  isYesterday,
  parseISO,
  differenceInDays,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Send,
  X,
  Filter,
  Calendar as CalendarIcon,
  Star,
} from "lucide-react";
import QuoteChat from "@/components/logcommonlayout/QuoteChat";

const ViewQoute = () => {
  const { user } = useUser();
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatQuoteId, setChatQuoteId] = useState(null);
  const [expandedQuoteId, setExpandedQuoteId] = useState(null);

  // Review states
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewQuoteId, setReviewQuoteId] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        if (!user?._id) return;

        const response = await getuserAllQoutesApi(user._id);
        if (response.success) {
          setQuotes(response.quotesList || []);
        } else {
          throw new Error(response.message || "Failed to fetch quotes");
        }
      } catch (err) {
        console.error("Error fetching quotes:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, [user?._id]);

  // Open review modal
  const openReviewModal = (quoteId) => {
    setReviewQuoteId(quoteId);
    setIsReviewModalOpen(true);
    setReviewText("");
    setReviewRating(0);
  };

  // Submit review
  const submitReview = async () => {
    try {
      if (!reviewQuoteId || !reviewText.trim() || reviewRating === 0) return;

      const result = await callSubmitReviewApi({
        quoteId: reviewQuoteId,
        text: reviewText,
        rating: reviewRating,
      });

      if (result.success) {
        // Update local state with new review
        setQuotes((prevQuotes) =>
          prevQuotes.map((quote) =>
            quote._id === reviewQuoteId
              ? {
                  ...quote,
                  review: {
                    text: reviewText,
                    rating: reviewRating,
                    reviewedAt: new Date().toISOString(),
                  },
                }
              : quote
          )
        );
        setIsReviewModalOpen(false);
      }
    } catch (error) {
      console.error("Review submission failed", error);
    }
  };

  // Filter quotes based on status and date
  const filteredQuotes = quotes.filter((quote) => {
    // Status filter
    const statusMatch = statusFilter === "all" || quote.status === statusFilter;

    // Date filter
    if (dateFilter === "all") return statusMatch;

    const quoteDate = parseISO(quote.createdAt);
    const today = new Date();

    switch (dateFilter) {
      case "today":
        return statusMatch && isToday(quoteDate);
      case "yesterday":
        return statusMatch && isYesterday(quoteDate);
      case "this-week":
        return statusMatch && differenceInDays(today, quoteDate) <= 7;
      case "this-month":
        return (
          statusMatch &&
          quoteDate.getMonth() === today.getMonth() &&
          quoteDate.getFullYear() === today.getFullYear()
        );
      default:
        return statusMatch;
    }
  });

  const toggleExpand = (id) => {
    setExpandedQuoteId(expandedQuoteId === id ? null : id);
  };

  const statusConfig = {
    Completed: {
      icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
      color: "text-emerald-500",
      bg: "bg-emerald-50 border border-emerald-100",
    },
    pending: {
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      color: "text-blue-500",
      bg: "bg-blue-50 border border-blue-100",
    },
    Rejected: {
      icon: <XCircle className="h-4 w-4 text-rose-500" />,
      color: "text-rose-500",
      bg: "bg-rose-50 border border-rose-100",
    },
    "In Progress": {
      icon: <Clock className="h-4 w-4 text-amber-500" />,
      color: "text-amber-500",
      bg: "bg-amber-50 border border-amber-100",
    },
  };

  const priorityConfig = {
    High: "bg-rose-100 text-rose-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const today = new Date();

    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (differenceInDays(today, date) < 7) {
      return format(date, "EEE");
    } else {
      return format(date, "MMM d");
    }
  };

  const QuoteCard = ({ quote }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 hover:shadow-md transition-shadow"
    >
      <div
        className="p-5 cursor-pointer flex items-start"
        onClick={() => toggleExpand(quote._id)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {quote.subject}
            </h3>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                priorityConfig[quote.priority]
              }`}
            >
              {quote.priority}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-xs">
              {format(new Date(quote.createdAt), "MMM dd, yyyy")}
            </div>
            <div
              className={`flex items-center gap-1 ${
                statusConfig[quote.status]?.color || "text-gray-500"
              }`}
            >
              {statusConfig[quote.status]?.icon || (
                <Clock className="h-4 w-4" />
              )}
              <span>{quote.status}</span>
            </div>
          </div>
        </div>

        <button className="p-1 text-gray-400 hover:text-gray-600">
          {expandedQuoteId === quote._id ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {expandedQuoteId === quote._id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100"
          >
            <div className="p-5 pt-4">
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                  {quote.description}
                </p>
              </div>

              {quote.response && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Admin Response
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                      {quote.response}
                    </p>
                  </div>
                </div>
              )}

              {/* Review Section */}
              {quote.review && (
                <div className="mt-4 mb-4">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Your Review
                  </h4>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < quote.review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-amber-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                      {quote.review.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Reviewed on{" "}
                      {quote.review.reviewedAt &&
                      !isNaN(new Date(quote.review.reviewedAt))
                        ? format(
                            new Date(quote.review.reviewedAt),
                            "MMM dd, yyyy"
                          )
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 bg-indigo-50 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setChatQuoteId(quote._id);
                    }}
                  >
                    <MessageSquare size={16} />
                    Chat with Admin
                  </button>

                  {/* Review Button */}
                  {quote.status === "Completed" && !quote.review && (
                    <button
                      className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-800 px-3 py-1.5 bg-amber-50 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        openReviewModal(quote._id);
                      }}
                    >
                      <Star size={16} />
                      Add Review
                    </button>
                  )}
                </div>

                <div
                  className={`${
                    statusConfig[quote.status]?.bg || "bg-gray-50"
                  } px-3 py-1.5 rounded-lg`}
                >
                  <div className="flex items-center gap-1.5 text-sm">
                    {statusConfig[quote.status]?.icon || (
                      <Clock className="h-4 w-4" />
                    )}
                    <span
                      className={
                        statusConfig[quote.status]?.color || "text-gray-700"
                      }
                    >
                      {quote.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto relative z-10 p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>

            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto relative z-10 p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Quotes & Responses
          </h2>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 mb-3">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Quotes & Responses
          </h2>
          <p className="text-gray-500">
            Review and manage your submitted quotes
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Quotes ({filteredQuotes.length})
            </h3>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      statusFilter === "all"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    All
                  </button>
                  {Object.keys(statusConfig).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 ${
                        statusFilter === status
                          ? `${statusConfig[status].bg} ${statusConfig[status].color} font-medium`
                          : "bg-white text-gray-700 border border-gray-300"
                      }`}
                    >
                      {statusConfig[status].icon}
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Date
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDateFilter("all")}
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      dateFilter === "all"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    All Dates
                  </button>
                  <button
                    onClick={() => setDateFilter("today")}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 ${
                      dateFilter === "today"
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    <CalendarIcon size={14} />
                    Today
                  </button>
                  <button
                    onClick={() => setDateFilter("yesterday")}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 ${
                      dateFilter === "yesterday"
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    <CalendarIcon size={14} />
                    Yesterday
                  </button>
                  <button
                    onClick={() => setDateFilter("this-week")}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 ${
                      dateFilter === "this-week"
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    <CalendarIcon size={14} />
                    This Week
                  </button>
                  <button
                    onClick={() => setDateFilter("this-month")}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 ${
                      dateFilter === "this-month"
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    <CalendarIcon size={14} />
                    This Month
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {filteredQuotes.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Filter size={24} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No matching quotes
              </h3>
              <p className="text-gray-500 mb-4">
                No quotes match your current filters. Try adjusting your filter
                settings.
              </p>
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setDateFilter("all");
                }}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {filteredQuotes.map((quote) => (
                <QuoteCard key={quote._id} quote={quote} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Chat Modal */}
      {chatQuoteId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setChatQuoteId(null)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <QuoteChat
              quoteId={chatQuoteId}
              user={{ isAdmin: false }}
              onClose={() => setChatQuoteId(null)}
            />
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Submit Review
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className={`p-1 rounded-full transition-colors ${
                      star <= reviewRating
                        ? "text-amber-500 hover:text-amber-600"
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                  >
                    <Star
                      size={24}
                      fill={star <= reviewRating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Share your experience with this quote..."
              />
            </div>

            <button
              onClick={submitReview}
              disabled={reviewRating === 0 || !reviewText.trim()}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewQoute;
