import Header from "@/components/logcommonlayout/Header";
import { getuserAllQoutesApi } from "@/service";
import { useUser } from "@/context/use_context";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ViewQoute = () => {
  const { user } = useUser();
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const statusIcon = {
    Completed: <CheckCircle className="h-4 w-4 text-green-500" />,
    Rejected: <XCircle className="h-4 w-4 text-red-500" />,
    "In Progress": <Clock className="h-4 w-4 text-yellow-500" />,
    Pending: <Clock className="h-4 w-4 text-gray-500" />,
  };

  const QuoteCard = ({ quote }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-5 shadow-md hover:shadow-emerald-500/10 transition-all duration-300 mb-4"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-1 flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-100 truncate">
            {quote.subject}
          </h3>
          <p className="text-sm text-gray-400 whitespace-pre-wrap break-words">
            {quote.description}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ml-4 flex-shrink-0 ${
            quote.priority === "High"
              ? "bg-red-500/20 text-red-400"
              : quote.priority === "Medium"
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {quote.priority}
        </span>
      </div>

      {quote.response && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-400 mb-1">Admin Response</h4>
              <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                {quote.response}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
        <span>
          Created: {format(new Date(quote.createdAt), "MMM dd, yyyy")}
        </span>
        <div className="flex items-center gap-2">
          {statusIcon[quote.status]}
          <span
            className={`italic ${
              quote.status === "Completed"
                ? "text-green-400"
                : quote.status === "Rejected"
                ? "text-red-400"
                : quote.status === "In Progress"
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
          >
            {quote.status}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto relative z-10 p-6 bg-gray-900/60 backdrop-blur-xl rounded-lg shadow-xl">
        <Header title="View Responses" className="mb-8" />
        <div className="max-w-4xl mx-auto space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-800/40 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto relative z-10 p-6 bg-gray-900/60 backdrop-blur-xl rounded-lg shadow-xl">
        <Header title="View Responses" className="mb-8" />
        <div className="max-w-4xl mx-auto bg-red-900/20 border border-red-700 rounded-xl p-6 text-center">
          <p className="text-red-400">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-800/30 hover:bg-red-800/40 rounded-md text-red-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 p-6 bg-gray-900/60 backdrop-blur-xl rounded-lg shadow-xl">
      <Header title="View Responses" className="mb-8" />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-6">
          Your Quotes & Responses
        </h2>

        {quotes.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No quotes with responses yet</p>
            <p className="mt-2">Admin responses will appear here</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {quotes.map((quote) => (
                <QuoteCard key={quote._id} quote={quote} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ViewQoute;
