import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
            <img
              // src="/images/"  logo-white.png
              src="/images/client.jpg"
              alt="Company Logo"
              width={160}
              height={48}
              className="mb-8"
            />
          </div>

          <h2 className="text-4xl font-bold text-white mb-6">
            Transform Your Business
          </h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                  Advanced Analytics
                </h3>
                <p className="text-blue-200">
                  Real-time insights and data visualization for informed
                  decisions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Workflow Automation
                </h3>
                <p className="text-blue-200">
                  Streamline processes with intelligent automation tools
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                  Team Collaboration
                </h3>
                <p className="text-blue-200">
                  Seamless communication and task management
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 border-t border-blue-800/30 pt-8">
          <p className="text-blue-300/80 text-sm">
            Trusted by 5000+ businesses worldwide
          </p>
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
              src="/images/logo-dark.png"
              alt="Company Logo"
              width={160}
              height={48}
              className="mx-auto"
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
                  Don't have an account?{" "}
                  <span className="ml-1 font-medium text-blue-600">
                    Start free trial
                  </span>
                </>
              ) : (
                <>
                  Already registered?{" "}
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
