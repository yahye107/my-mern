import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-gray-100">
          404 - Page Not Found
        </h1>
        <p className="text-gray-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg"
        >
          Go to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
