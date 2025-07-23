import { Loader2 } from "lucide-react";
import React from "react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            Processing your request...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
