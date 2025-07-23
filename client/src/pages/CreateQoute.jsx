import { useState, useEffect } from "react";
import { useUser } from "@/context/use_context";
import { callCreateQuoteApi, getuserAllQoutesApi } from "@/service";

import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, ImageIcon, FileIcon, Loader2 } from "lucide-react";
import GlobalLoading from "@/components/logcommonlayout/GlobalLoadin";

const CreateQuote = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    priority: "Medium",
    description: "",
    attachments: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      setGlobalLoading(true);
      try {
        const response = await getuserAllQoutesApi(user?._id);
        if (response.success) {
          setQuotes(response.quotesList || []);
        }
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setIsLoadingQuotes(false);
        setGlobalLoading(false);
      }
    };

    if (user?._id) fetchQuotes();
  }, [user?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGlobalLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("subject", formData.subject);
      payload.append("priority", formData.priority);
      payload.append("description", formData.description);
      payload.append("userId", user._id);

      if (formData.attachments && formData.attachments.length > 0) {
        for (let i = 0; i < formData.attachments.length; i++) {
          payload.append("attachments", formData.attachments[i]);
        }
      }

      const response = await callCreateQuoteApi(payload);

      if (response.success) {
        setIsOpen(false);
        setFormData({
          subject: "",
          priority: "Medium",
          description: "",
          attachments: null,
        });
        setQuotes((prev) => [response.quote, ...prev]);
      } else {
        setError(response.message || "Failed to create quote");
      }
    } catch (err) {
      setError("An error occurred while creating the quote");
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setGlobalLoading(false);
    }
  };

  const QuoteCard = ({ quote }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow duration-300 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-1 flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {quote.subject}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-wrap break-words">
            {quote.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {quote.attachments.map((file, idx) => {
              const name = file.originalName || "";
              const ext = name.split(".").pop().toLowerCase();
              const isPDF = ext === "pdf";
              const isImage = ["png", "jpg", "jpeg", "gif"].includes(ext);
              const fileUrl = file.url;

              return (
                <a
                  key={idx}
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {isPDF ? (
                    <FileText size={16} />
                  ) : isImage ? (
                    <ImageIcon size={16} />
                  ) : (
                    <FileIcon size={16} />
                  )}
                  <span className="max-w-[120px] truncate">
                    {file.originalName || "View File"}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ml-4 flex-shrink-0 ${
            quote.priority === "High"
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              : quote.priority === "Medium"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          }`}
        >
          {quote.priority}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <span>
          Created: {format(new Date(quote.createdAt), "MMM dd, yyyy")}
        </span>
        <span className="mt-1 sm:mt-0">
          Status: <span className="font-medium">{quote.status}</span>
        </span>
      </div>
    </div>
  );
  // if (globalLoading) return <GlobalLoading />;
  return (
    <div className="flex-1 overflow-auto relative z-10 p-4 md:p-6 bg-gray-50 ">
      {/* Global Loading Overlay */}
      {/* {globalLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              Processing your request...
            </p>
          </div>
        </div>
      )} */}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Create Quote
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create quotes
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow transition-all"
                size="sm"
              >
                + Create New Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 rounded-xl shadow-xl sm:max-w-xl max-h-[90vh] overflow-y-auto p-6">
              <DialogHeader className="mb-5">
                <DialogTitle className="text-xl font-semibold">
                  Create New Quote Request
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1">
                  Provide details about the service you need
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    placeholder="Brief summary of your request"
                    className="bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-gray-700">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800">
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments</Label>
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attachments: e.target.files,
                        })
                      }
                      className="bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    required
                    rows={4}
                    className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe your service needs in detail"
                  />
                </div>

                {formData.attachments && formData.attachments.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Selected files:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {Array.from(formData.attachments).map((file, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FileIcon size={14} />
                          <span className="truncate max-w-[200px]">
                            {file.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {error && (
                  <p className="text-red-500 text-sm text-center p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    {error}
                  </p>
                )}

                <div className="pt-4 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="border-gray-300 dark:border-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Quote"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Quote History
          </h2>

          {/* Quote List */}
          {isLoadingQuotes ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-10">
              <div className="mx-auto bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <FileText
                  className="text-gray-400 dark:text-gray-300"
                  size={24}
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                No quotes created yet
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                Your created quotes will appear here. Get started by creating
                your first quote request.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((quote) => (
                <QuoteCard key={quote._id} quote={quote} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuote;
