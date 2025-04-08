import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Company X",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    quote:
      "This CRM has completely transformed our sales processes. Our team is more efficient, and we’re able to close deals faster than ever.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    role: "Marketing Manager, Company Y",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    quote:
      "An intuitive interface that makes tracking customer interactions so much easier. Highly recommend for anyone in sales or marketing.",
    rating: 4,
  },
  {
    name: "Michael Johnson",
    role: "Product Manager, Company Z",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    quote:
      "I love the automation features. It has saved me a ton of time and helped us streamline our workflows significantly.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16 text-zinc-900"
        >
          What Our Customers Are Saying
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 justify-center items-start max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.3,
                type: "spring",
                stiffness: 100,
              }}
              className={`bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                index === 1 ? "md:mt-12 z-20" : "z-10"
              }`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-indigo-600">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                “{testimonial.quote}”
              </p>
              <div className="flex justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.586 2.93a1 1 0 01-1.47-1.054L5.29 12.45 1.12 8.868a1 1 0 01.556-1.692l6.118-.845 2.535-6.344a1 1 0 011.89 0l2.535 6.344 6.118.845a1 1 0 01.556 1.692l-4.17 3.582 1.136 5.822a1 1 0 01-1.47 1.054L10 15z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
