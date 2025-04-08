// components/common/CommonQuoteCard.jsx
import { format } from "date-fns";
import { motion } from "framer-motion";

const priorityStyles = {
  Question: "bg-blue-100 text-blue-800",
  problems: "bg-yellow-100 text-yellow-800",
  Important: "bg-red-100 text-red-800",
};

export const CommonQuoteCard = ({ quote }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3, // Reduced from default 0.4s
        ease: "easeOut", // Smoother easing
        delay: 0.15, // Stagger effect between items
      }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 min-w-0 hover:border-emerald-500/30 transition-all"
    >
      <div className="flex items-start gap-4 mb-4 min-w-0">
        <div className="flex-shrink-0">
          <img
            src="/images/client.jpg"
            alt="Quote"
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start min-w-0">
            <h3 className="text-lg font-semibold text-gray-200 truncate">
              {quote.subject}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                priorityStyles[quote.priority]
              }`}
            >
              {quote.priority}
            </span>
          </div>

          <p className="text-gray-400 mt-2 text-sm break-words whitespace-pre-line">
            {quote.description}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <time className="text-sm text-gray-500">
          {format(new Date(quote.createdAt), "dd MMM yyyy")}
        </time>
      </div>
    </motion.div>
  );
};
