import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time Stats",
    description:
      "Monitor your data and quotes live with powerful dashboards and graphs.",
  },
  {
    title: "Smart Quote Management",
    description:
      "Easily create, track, and manage quotes with status-based workflows.",
  },
  {
    title: "Admin Control Panel",
    description:
      "Admins can review, respond, and manage all user queries in one place.",
  },
  {
    title: "Secure User System",
    description:
      "User authentication, role-based access, and secure password updates.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-[#0a0a0a] dark:to-[#151515] py-24"
    >
      <div className="container mx-auto px-6 lg:px-20">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16"
        >
          Our Features
        </motion.h1>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-1 shadow-2xl opacity-10 dark:opacity-20" />
            <img
              src="images/custmor.jpg"
              alt="Feature preview"
              className="rounded-[2rem] shadow-2xl border-8 border-white/10 transform hover:rotate-[1deg] transition-transform duration-300 w-full"
            />
          </motion.div>

          {/* Right Cards - Responsive Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        duration: 0.5,
                      },
                    },
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all h-full flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                    {feature.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                    <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                      Learn more →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        >
      </div>
    </section>
  );
};

export default Features;
