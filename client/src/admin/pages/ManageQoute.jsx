import React, { useEffect, useState } from "react";
import Header from "../componets/Header";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getAllQoutesApi, callRespondToQuoteApi } from "@/service";
import {
  MessageCircle,
  CheckCircle2,
  Loader2,
  FileText,
  ChevronDown,
  XCircle,
  Filter,
  Calendar,
  User,
  Mail,
  Clock,
  X,
  Star,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import QuoteChat from "@/components/logcommonlayout/QuoteChat";
import { Badge } from "@/components/ui/badge";
import {
  format,
  isToday,
  isYesterday,
  parseISO,
  differenceInDays,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";

const ManageQoute = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [chatQuoteId, setChatQuoteId] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      const data = await getAllQoutesApi();
      if (data?.success) {
        setQuotes(data.quotes);
      }
      setLoading(false);
    };
    fetchQuotes();
  }, []);

  const handleSubmitResponse = async () => {
    if (!responseText || !selectedQuoteId) return;

    const result = await callRespondToQuoteApi(selectedQuoteId, responseText);
    if (result?.success) {
      setSuccessMessage("✅ Response submitted successfully");
      const updated = await getAllQoutesApi();
      setQuotes(updated.quotes);
      setResponseText("");
      setTimeout(() => setSelectedQuoteId(null), 1500);
    } else {
      setSuccessMessage("❌ Something went wrong. Please try again.");
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Apply both status and date filters
  const filteredQuotes = quotes.filter((quote) => {
    // Status filter
    const statusMatch = filterStatus === "all" || quote.status === filterStatus;

    // Date filter
    if (filterDate === "all") return statusMatch;

    if (!quote.createdAt) return statusMatch;

    const quoteDate = parseISO(quote.createdAt);
    const today = new Date();

    switch (filterDate) {
      case "today":
        return statusMatch && isToday(quoteDate);
      case "yesterday":
        return statusMatch && isYesterday(quoteDate);
      case "this-week":
        const weekStart = startOfWeek(today);
        const weekEnd = endOfWeek(today);
        return (
          statusMatch &&
          isWithinInterval(quoteDate, { start: weekStart, end: weekEnd })
        );
      case "this-month":
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        return (
          statusMatch &&
          isWithinInterval(quoteDate, { start: monthStart, end: monthEnd })
        );
      default:
        return statusMatch;
    }
  });

  const statusStyles = {
    Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
    // Rejected: "bg-rose-100 text-rose-800 border-rose-200",
    // "In Progress": "bg-amber-100 text-amber-800 border-amber-200",
    pending: "bg-blue-100 text-blue-800 border-blue-200",
    default: "bg-gray-100 text-gray-800 border-gray-200",
  };

  // Format date with relative information
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";

    const date = parseISO(dateString);
    const today = new Date();

    if (isToday(date)) {
      return `Today at ${format(date, "hh:mm a")}`;
    } else if (isYesterday(date)) {
      return `Yesterday at ${format(date, "hh:mm a")}`;
    } else if (differenceInDays(today, date) < 7) {
      return format(date, "EEE, hh:mm a");
    } else {
      return format(date, "MMM dd, yyyy");
    }
  };

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 bg-white text-gray-800 min-h-screen">
      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="text-gray-500 text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Total Quotes
          </div>
          <div className="text-2xl font-bold mt-1 text-gray-800">
            {quotes.length}
          </div>
        </div>

        {Object.entries(statusStyles).map(([status, style]) => {
          if (status === "default") return null;
          return (
            <div
              key={status}
              className={`${style} rounded-xl p-4 border shadow-sm`}
            >
              <div className="text-sm flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    status === "Completed"
                      ? "bg-emerald-500"
                      : status === "Rejected"
                      ? "bg-rose-500"
                      : status === "In Progress"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                  }`}
                ></span>
                {status}
              </div>
              <div className="text-2xl font-bold mt-1">
                {quotes.filter((q) => q.status === status).length}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 bg-white border-gray-300"
          >
            <Filter size={16} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
                className={`${
                  filterStatus === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                All Statuses
              </Button>
              {Object.keys(statusStyles).map((status) => {
                if (status === "default") return null;
                return (
                  <Button
                    key={status}
                    variant="outline"
                    onClick={() => setFilterStatus(status)}
                    size="sm"
                    className={`${
                      filterStatus === status
                        ? `${
                            status === "Completed"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : status === "Rejected"
                              ? "bg-rose-100 text-rose-800 border-rose-300"
                              : status === "In Progress"
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : "bg-blue-100 text-blue-800 border-blue-300"
                          } font-semibold`
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {status}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterDate === "all" ? "default" : "outline"}
                onClick={() => setFilterDate("all")}
                size="sm"
                className={`${
                  filterDate === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                All Dates
              </Button>
              <Button
                variant={filterDate === "today" ? "default" : "outline"}
                onClick={() => setFilterDate("today")}
                size="sm"
                className={`${
                  filterDate === "today"
                    ? "bg-blue-100 text-blue-800 border-blue-300 font-semibold"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center gap-1`}
              >
                <Calendar size={14} />
                Today
              </Button>
              <Button
                variant={filterDate === "yesterday" ? "default" : "outline"}
                onClick={() => setFilterDate("yesterday")}
                size="sm"
                className={`${
                  filterDate === "yesterday"
                    ? "bg-blue-100 text-blue-800 border-blue-300 font-semibold"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center gap-1`}
              >
                <Calendar size={14} />
                Yesterday
              </Button>
              <Button
                variant={filterDate === "this-week" ? "default" : "outline"}
                onClick={() => setFilterDate("this-week")}
                size="sm"
                className={`${
                  filterDate === "this-week"
                    ? "bg-blue-100 text-blue-800 border-blue-300 font-semibold"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center gap-1`}
              >
                <Calendar size={14} />
                This Week
              </Button>
              <Button
                variant={filterDate === "this-month" ? "default" : "outline"}
                onClick={() => setFilterDate("this-month")}
                size="sm"
                className={`${
                  filterDate === "this-month"
                    ? "bg-blue-100 text-blue-800 border-blue-300 font-semibold"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center gap-1`}
              >
                <Calendar size={14} />
                This Month
              </Button>
            </div>
          )}

          <div className="relative">
            <select
              onChange={(e) => {
                const sorted = [...quotes].sort((a, b) =>
                  e.target.value === "newest"
                    ? new Date(b.createdAt) - new Date(a.createdAt)
                    : e.target.value === "oldest"
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : a.status.localeCompare(b.status)
                );
                setQuotes(sorted);
              }}
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Sort by</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="status">Status (A-Z)</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Quotes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-60 rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : filteredQuotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuotes.map((quote) => (
            <div
              key={quote._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:border-blue-300 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="w-4/5">
                    <h3 className="font-bold text-lg truncate">
                      {quote.subject}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {quote.createdAt
                        ? formatDate(quote.createdAt)
                        : "Unknown date"}
                    </div>
                  </div>
                  <Badge
                    className={`${
                      statusStyles[quote.status] || statusStyles.default
                    } border font-medium`}
                  >
                    {quote.status || "pending"}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">From:</span>
                    <span className="truncate">
                      {quote?.userId?.firstname && quote?.userId?.lastname
                        ? `${quote.userId.firstname} ${quote.userId.lastname}`
                        : "Unknown User"}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 ml-6 truncate">
                    <Mail className="h-3 w-3 mr-1" />
                    {quote?.userId?.email || "No email provided"}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700 flex items-center">
                      Description
                    </div>
                    <button
                      onClick={() => toggleDescription(quote._id)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      {expandedDescriptions[quote._id]
                        ? "Show less"
                        : "Show more"}
                    </button>
                  </div>
                  <p
                    className={`text-sm text-gray-600 ${
                      expandedDescriptions[quote._id] ? "" : "line-clamp-2"
                    }`}
                  >
                    {quote.description}
                  </p>
                </div>

                {quote.attachments?.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Attachments
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quote.attachments.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 hover:bg-gray-200 transition-colors"
                        >
                          <FileText className="h-3 w-3" />
                          <span>File {idx + 1}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {/* Review Section */}
                {quote.review?.text && quote.review?.rating && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      User Review
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
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
                        <span className="text-xs text-amber-700 ml-2">
                          {quote.review.rating}/5
                        </span>
                      </div>
                      <p className="text-sm text-gray-800">
                        {quote.review.text}
                      </p>
                      {quote.review.reviewedAt && (
                        <p className="text-xs text-gray-500 mt-2">
                          Reviewed on{" "}
                          {format(
                            new Date(quote.review.reviewedAt),
                            "MMM dd, yyyy"
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
                <Dialog
                  open={selectedQuoteId === quote._id}
                  onOpenChange={(isOpen) =>
                    setSelectedQuoteId(isOpen ? quote._id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`gap-1.5 ${
                        quote.status === "Completed"
                          ? "bg-gray-100 text-gray-500 border-gray-300"
                          : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      }`}
                      disabled={quote.status === "Completed"}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Respond
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-md bg-white border-gray-300">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-lg">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                        Respond to Quote
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        {quote.subject}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                      <Textarea
                        placeholder="Write your detailed response here..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="min-h-[150px] bg-gray-50 border-gray-300 text-gray-800"
                      />
                      {successMessage && (
                        <div
                          className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                            successMessage.includes("✅")
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-rose-100 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {successMessage.includes("✅") ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          {successMessage}
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <Button
                        onClick={handleSubmitResponse}
                        disabled={!responseText.trim() || successMessage}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {!successMessage ? (
                          "Submit Response"
                        ) : (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setChatQuoteId(quote._id)}
                  className="bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  View Chat
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <Filter className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No quotes found
          </h3>
          <p className="text-gray-500 max-w-md">
            {filterStatus === "all" && filterDate === "all"
              ? "There are currently no quotes in the system"
              : `No quotes match your current filters`}
          </p>
          {(filterStatus !== "all" || filterDate !== "all") && (
            <Button
              variant="ghost"
              className="mt-4 text-blue-600"
              onClick={() => {
                setFilterStatus("all");
                setFilterDate("all");
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Chat Modal */}
      {chatQuoteId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setChatQuoteId(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <QuoteChat
                quoteId={chatQuoteId}
                user={{ isAdmin: true }}
                onClose={() => setChatQuoteId(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQoute;
