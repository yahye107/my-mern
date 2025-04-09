import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/use_context";
import { useState, useEffect } from "react";
import { callCreateQuoteApi, getuserAllQoutesApi } from "@/service";
import Header from "@/components/logcommonlayout/Header";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const CreateQuote = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    priority: "Medium",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await getuserAllQoutesApi(user?._id);
        if (response.success) {
          setQuotes(response.quotesList || []);
        }
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setIsLoadingQuotes(false);
      }
    };
    if (user?._id) fetchQuotes();
  }, [user?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await callCreateQuoteApi({
        ...formData,
        userId: user._id,
      });
      if (response.success) {
        setIsOpen(false);
        setFormData({ subject: "", priority: "Medium", description: "" });
        setQuotes((prev) => [response.quote, ...prev]);
      } else {
        setError(response.message || "Failed to create quote");
      }
    } catch (err) {
      setError("An error occurred while creating the quote");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          Created: {format(new Date(quote.createdAt), "MMM dd, yyyy")}
        </span>
        <span className="italic">Status: {quote.status}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="flex-1 overflow-auto relative z-10 p-6 bg-gray-900/60 backdrop-blur-xl rounded-lg shadow-xl">
      <Header title="Create New Quote" className="mb-8" />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight m-10">
            Your Quotes Histroy
          </h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-semibold shadow-md"
                size="sm"
              >
                + Create New Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900/95 backdrop-blur-xl text-white border border-gray-700 rounded-2xl sm:max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto px-6 py-8">
              <DialogHeader className="mb-6 text-center space-y-1">
                <DialogTitle className="text-2xl font-semibold">
                  Create New Quote
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-sm">
                  Fill out the form below to request service assistance
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Subject Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-300"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    placeholder="Enter subject"
                    className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg px-4 py-2"
                  />
                </div>

                {/* Priority Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="priority"
                    className="text-sm font-medium text-gray-300"
                  >
                    Priority
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 text-white border border-gray-700 focus:ring-emerald-500 rounded-lg px-4 py-2">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-gray-700 text-white rounded-md">
                      <SelectItem
                        value="High"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md"
                      >
                        High
                      </SelectItem>
                      <SelectItem
                        value="Medium"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md"
                      >
                        Medium
                      </SelectItem>
                      <SelectItem
                        value="Low"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md"
                      >
                        Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-300"
                  >
                    Description
                  </Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe your issue or request"
                    required
                    rows={6}
                    className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 resize-y min-h-[120px] p-3 rounded-lg whitespace-pre-line break-words"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                {/* Buttons */}
                <div className="pt-6 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg px-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md rounded-lg px-6"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Quote"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {isLoadingQuotes ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-800/40 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No quotes created yet</p>
            <p className="mt-2">Your created quotes will appear here</p>
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

export default CreateQuote;
