import React from "react";
import { Rocket, ChevronRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950">
      {/* Header */}
      <motion.header className="fixed w-full top-0 z-50 backdrop-blur-lg border-b border-zinc-800 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <Rocket className="w-8 h-8 text-indigo-400" />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                NexusCRM
              </span>
              <p className="text-xs text-gray-400 mt-1">Support Made Simple</p>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex gap-8 items-center"
          >
            {[
              { label: "Home", href: "#" },
              { label: "Contect Us", href: "#info" },
              { label: "Features", href: "#resources" },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text hover:text-transparent transition-all duration-300"
              >
                {item.label}
              </motion.a>
            ))}
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-2 rounded-full flex items-center gap-2 text-white"
              >
                Submit a Request <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute w-full bg-zinc-900/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-6 py-4">
              {[
                { label: "Home", href: "#" },
                { label: "How It Works", href: "#info" },
                { label: "Help Center", href: "#resources" },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-center text-gray-300 hover:text-white border-b border-zinc-800"
                >
                  {item.label}
                </motion.a>
              ))}
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg text-center">
                  Submit a Request
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section className="pt-40 pb-24 container mx-auto px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full"
          />

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Need Help? <br /> We’re Just a Quote Away.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create a request, ask a question, or report an issue — and our team
            will handle it with speed, clarity, and care. Simple. Transparent.
            Always on.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-8 py-4 rounded-full text-lg text-white flex items-center gap-2"
              >
                Create a Quote <Rocket className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-lg border border-indigo-500/30 hover:border-indigo-400 text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20"
              >
                Sign In / Register
              </motion.button>
            </Link>
          </div>

          {/* Trust Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "5,000+", label: "Clients Served" },
              { value: "100K+", label: "Requests Resolved" },
              { value: "1 Hour", label: "Avg. Response Time" },
              { value: "98%", label: "Positive Feedback" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/50"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MainHeader;
