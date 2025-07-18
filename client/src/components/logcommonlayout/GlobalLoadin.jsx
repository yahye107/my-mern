import React from "react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <div className="text-gray-600 dark:text-gray-300 text-lg animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
