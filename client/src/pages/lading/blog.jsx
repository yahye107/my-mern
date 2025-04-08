import React from "react";
import { motion } from "framer-motion";

const BlogResources = () => {
  const posts = [
    {
      title: "Maximizing Sales with CRM Automation",
      excerpt:
        "Discover how CRM automation can save time, reduce errors, and improve customer interactions for your business.",
      link: "/blog/crm-automation",
      image:
        "https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    },
    {
      title: "Top 5 CRM Features You Need for Business Growth",
      excerpt:
        "Explore the top CRM features that can help drive your business forward and enhance customer relationships.",
      link: "/blog/crm-features",
      image:
        "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    },
    {
      title: "How to Use CRM Analytics for Better Decision Making",
      excerpt:
        "Learn how to leverage CRM analytics to make informed business decisions and optimize your sales pipeline.",
      link: "/blog/crm-analytics",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    },
  ];

  return (
    <section
      id="resources"
      className="py-24 bg-[#f0fdfa] border-t border-gray-200/50"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16 text-gray-900"
        >
          Latest Articles & Resources
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <motion.article
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
              <div className="overflow-hidden rounded-2xl mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  loading="lazy"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                <a
                  href={post.link}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  {post.title}
                </a>
              </h3>
              <p className="text-gray-600 mb-6">{post.excerpt}</p>
              <a
                href={post.link}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label={`Read more about "${post.title}"`}
              >
                Read More
                <span aria-hidden="true" className="ml-2">
                  &rarr;
                </span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogResources;
