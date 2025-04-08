import React, { useEffect, useState } from "react";
import Header from "../componets/Header";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getAllQoutesApi, callRespondToQuoteApi } from "@/service";
import { MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// ... imports stay the same

const ManageQoute = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

  const statusStyles = {
    Completed: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
    Rejected: "bg-rose-500/10 text-rose-300 ring-rose-500/30",
    "In Progress": "bg-amber-500/10 text-amber-300 ring-amber-500/30",
    Pending: "bg-slate-500/10 text-slate-300 ring-slate-500/30",
  };

  return (
    <div className="flex-1 overflow-auto p-4 bg-gray-900 text-gray-100">
      <Header title="Manage Quotes" />

      <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800 shadow-sm overflow-x-auto">
        {/* Sorting Section */}
        <div className="flex justify-end p-4">
          <select
            onChange={(e) => {
              const sorted = [...quotes].sort((a, b) =>
                e.target.value === "pending"
                  ? a.status === "pending"
                    ? -1
                    : 1
                  : a.status.localeCompare(b.status)
              );
              setQuotes(sorted);
            }}
            className="bg-gray-700 text-gray-100 px-3 py-2 rounded-md text-sm"
          >
            <option value="">Sort by Status</option>
            <option value="pending">Pending First</option>
            <option value="status">A-Z Status</option>
          </select>
        </div>

        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <tr
                  key={quote._id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-100">
                      {quote?.userId?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {quote?.userId?.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">{quote.subject}</td>
                  <td className="px-4 py-3 max-w-xs truncate">
                    {quote.description}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        statusStyles[quote.status] || statusStyles.pending
                      }`}
                    >
                      {quote.status || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
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
                          className="gap-1.5 bg-gray-700 text-gray-100 hover:bg-gray-600"
                          disabled={quote.status === "Completed"}
                        >
                          <MessageCircle className="h-4 w-4" />
                          Respond
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[500px] bg-gray-900 text-gray-100">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-blue-400" />
                            Quote Response
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                          <Textarea
                            placeholder="Write your response here..."
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            className="min-h-[120px] bg-gray-800 text-gray-100"
                          />
                          {successMessage && (
                            <div
                              className={`flex items-center gap-2 p-3 rounded text-sm ${
                                successMessage.includes("✅")
                                  ? "bg-emerald-900 text-emerald-300"
                                  : "bg-rose-900 text-rose-300"
                              }`}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              {successMessage}
                            </div>
                          )}
                        </div>

                        <DialogFooter>
                          <Button
                            onClick={handleSubmitResponse}
                            disabled={!responseText.trim()}
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No quotes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageQoute;
