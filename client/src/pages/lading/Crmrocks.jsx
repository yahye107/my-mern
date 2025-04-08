import React from "react";
import { motion } from "framer-motion";

const Crmrocks = () => {
  const features = [
    {
      title: "Automation",
      desc: "Eliminate repetitive tasks with smart AI workflows. Several AI automation tools can streamline workflows and enhance productivity. Several AI automation tools can streamline workflows and enhance productivity.",
    },
    {
      title: "Real-time Analytics",
      desc: "Track performance and make informed decisions. Several AI automation tools can streamline workflows and enhance productivity. Several AI automation tools can streamline workflows and enhance productivity.",
    },
    {
      title: "Integrations",
      desc: "Connect with tools like Slack, Gmail, Zapier, and more. Several AI automation tools can streamline workflows and enhance productivity. Several AI automation tools can streamline workflows and enhance productivity.",
    },
    {
      title: "Scalable",
      desc: "Grow with confidence, from startup to enterprise. Several AI automation tools can streamline workflows and enhance productivity. Several AI automation tools can streamline workflows and enhance productivity.",
    },
  ];

  return (
    <section className="relative py-24 bg-[#f0fdfa] overflow-hidden border-t border-gray-200/50">
      {/* Floating background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-72 h-72 bg-teal-500/20 rounded-full -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-sky-500/20 rounded-full -bottom-40 -right-40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16 text-gray-900"
        >
          Why Choose Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            CRM?
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative bg-white/50 backdrop-blur-sm border border-gray-200/30 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Floating particles animation */}
        <div className="absolute -top-20 left-1/3 w-1 h-1 bg-blue-600/30 rounded-full animate-float" />
        <div className="absolute top-40 right-1/4 w-2 h-2 bg-teal-600/30 rounded-full animate-float delay-100" />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-sky-600/30 rounded-full animate-float delay-200" />
      </div>
    </section>
  );
};

export default Crmrocks;
