import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="relative py-28 bg-[#f0fdfa] overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-72 h-72 bg-teal-500/20 rounded-full -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-sky-500/20 rounded-full -bottom-40 -right-40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            How We Elevate CRM to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              New Heights
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto"
          >
            At Next-Level CRM Solutions, we transform customer relationship
            management through AI-driven insights and seamless automation.
            Discover how our platform can revolutionize your business
            operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-teal-700"
            >
              Start Your 30-Day Free Trial
            </motion.a>
          </motion.div>

          {/* Floating particles animation */}
          <div className="absolute -top-20 left-1/3 w-1 h-1 bg-blue-600/30 rounded-full animate-float" />
          <div className="absolute top-40 right-1/4 w-2 h-2 bg-teal-600/30 rounded-full animate-float delay-100" />
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-sky-600/30 rounded-full animate-float delay-200" />
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
