// AboutUs.jsx
import { motion } from "framer-motion";
import { Users, Globe, BarChart } from "lucide-react";

const AboutUs = () => (
  <section className="py-24 bg-white border-t">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          About Our Team
        </h2>
        <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
          We're a passionate team of CRM experts dedicated to transforming
          customer relationships through innovative technology.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12 mt-16">
        {[
          {
            icon: <Users className="w-12 h-12 text-indigo-600" />,
            title: "Who We Are",
            desc: "Founded in 2020, we're a remote-first team with members across 5 countries specializing in CRM solutions.",
          },
          {
            icon: <Globe className="w-12 h-12 text-indigo-600" />,
            title: "Our Mission",
            desc: "To empower businesses of all sizes with intuitive tools that turn customer data into meaningful relationships.",
          },
          {
            icon: <BarChart className="w-12 h-12 text-indigo-600" />,
            title: "Our Values",
            desc: "Customer-centric design, data-driven decisions, and continuous innovation drive everything we build.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl border border-indigo-100 shadow-sm"
          >
            <div className="mb-6">{item.icon}</div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default AboutUs;
