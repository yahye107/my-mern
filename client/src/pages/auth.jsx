import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

import { useState } from "react";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div
      id="auth"
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50"
    >
      {/* Branding Section - Cool Blue Gradient */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 to-blue-900 p-12 relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />

        <div className="z-10">
          <div className="mb-16">
            <div className="flex items-center gap-3">
              <Rocket className="w-8 h-8 text-indigo-400" />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  NexusCRM
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  Quote Management Platform
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white mb-6">
            Transform Quotes into Revenue
          </h2>
          <p className="text-blue-200 mb-10 max-w-lg">
            The complete solution to create, track, and convert customer quotes
            while building stronger relationships.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Professional Quote Creation
                </h3>
                <p className="text-blue-200">
                  Create polished, branded quotes in minutes with customizable
                  templates
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Real-time Quote Tracking
                </h3>
                <p className="text-blue-200">
                  See when clients view your quotes and get notified about
                  decisions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Client Relationship Hub
                </h3>
                <p className="text-blue-200">
                  Maintain complete client history with notes, interactions, and
                  documents
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              {/* <div className="bg-blue-600/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div> */}
              {/* <div>
                <h3 className="text-lg font-semibold text-white">
                  Sales Pipeline Management
                </h3>
                <p className="text-blue-200">
                  Visualize your sales process from quote to close
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 border-t border-blue-800/30 pt-8">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <img
                  key={item}
                  src={`https://randomuser.me/api/portraits/men/${
                    item + 40
                  }.jpg`}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-blue-900"
                />
              ))}
            </div>
            <p className="text-blue-300/80 text-sm">
              Trusted by 5,000+ clients to solve issues quickly
            </p>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center p-8 bg-white"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden text-center space-y-6 mb-12">
            <img
              src="/images/client.jpg"
              alt="Company Logo"
              // width={20}
              // height={20}
              // className="mx-auto rounded-full object-cover border-2  border-emerald-500"
              className="w-20 h-20 mx-auto rounded-full object-cover border-2  border-emerald-500"
            />

            <h1 className="text-3xl font-bold text-slate-900">
              {isLoginView ? "Welcome Back" : "Get Started"}
            </h1>
          </div>

          {/* Auth Content */}
          <motion.div
            key={isLoginView ? "login" : "register"}
            initial={{ opacity: 0, x: 20, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 0.8,
            }}
            className="bg-white rounded-xl shadow-lg p-8 border border-slate-100"
          >
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {isLoginView ? "Sign In to Continue" : "Create Your Account"}
                </h2>
                <p className="text-sm text-slate-500">
                  {isLoginView
                    ? "Manage your business operations effectively"
                    : "Start your 14-day free trial today"}
                </p>
              </div>

              {isLoginView ? <Login /> : <Register />}
            </div>
          </motion.div>

          {/* Toggle Auth Mode */}
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              {isLoginView ? (
                <>
                  New here?
                  <span className="ml-1 font-medium text-blue-600">
                    Create an account
                  </span>
                </>
              ) : (
                <>
                  Already have an account?
                  <span className="ml-1 font-medium text-blue-600">
                    Sign in here
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
