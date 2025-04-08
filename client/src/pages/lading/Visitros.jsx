import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView, useAnimation } from "framer-motion";

const logos = [
  {
    name: "Slack",
    svg: (
      <path d="M30 46.1c0-6.1-5-11.1-11.1-11.1S7.8 40 7.8 46.1c0 6.1 5 11.1 11.1 11.1h11.1V46.1zM35.5 46.1c0 6.1 5 11.1 11.1 11.1 6.1 0 11.1-5 11.1-11.1V0H46.6v46.1h-11.1zM76.1 30c6.1 0 11.1-5 11.1-11.1S82.2 7.8 76.1 7.8c-6.1 0-11.1 5-11.1 11.1v11.1h11.1zM76.1 35.5c-6.1 0-11.1 5-11.1 11.1 0 6.1 5 11.1 11.1 11.1h46.1V46.6H76.1v-11.1zM92.8 76.1c0 6.1 5 11.1 11.1 11.1 6.1 0 11.1-5 11.1-11.1 0-6.1-5-11.1-11.1-11.1h-11.1v11.1zM87.3 76.1c0-6.1-5-11.1-11.1-11.1-6.1 0-11.1 5-11.1 11.1v46.1H76.2V76.1h11.1zM46.7 92.8c-6.1 0-11.1 5-11.1 11.1 0 6.1 5 11.1 11.1 11.1 6.1 0 11.1-5 11.1-11.1v-11.1H46.7zM46.7 87.3c6.1 0 11.1-5 11.1-11.1 0-6.1-5-11.1-11.1-11.1H0v22.2h46.7z" />
    ),
    viewBox: "0 0 122.8 122.8",
  },
  {
    name: "Spotify",
    svg: (
      <path d="M84 0a84 84 0 1 0 0 168 84 84 0 0 0 0-168zm38.4 120.4c-1.6 2.6-4.9 3.4-7.5 1.8-20.6-12.5-46.5-15.4-77.1-8.7-3 0.7-6-1.2-6.7-4.2-0.7-3 1.2-6 4.2-6.7 34.4-7.7 64.9-4.4 89.3 10.1 2.6 1.5 3.4 4.8 1.8 7.5zm10.8-20.5c-2 3.2-6.2 4.2-9.4 2.2-23.6-14.4-59.6-18.6-87.4-10.5-3.6 1-7.3-1-8.3-4.6-1-3.6 1-7.3 4.6-8.3 33.5-9.5 74-5 101.4 12 3.2 2 4.2 6.2 2.2 9.4zm0.7-22.4C108 58.6 66.5 56.4 39.8 63.5c-4.2 1.1-8.5-1.3-9.6-5.5-1.1-4.2 1.3-8.5 5.5-9.6 32.2-8.4 79.4-5.9 112.3 14.1 3.7 2.2 4.9 6.9 2.7 10.6-2.2 3.7-6.9 4.9-10.6 2.7z" />
    ),
    viewBox: "0 0 168 168",
  },
  {
    name: "Netflix",
    svg: (
      <path d="M0 0v512h512V0H0zm328.9 450.5-96.8-180.3v180.3h-57.9V61.5l96.8 180.3V61.5h57.9v389z" />
    ),
    viewBox: "0 0 512 512",
  },
  {
    name: "GitHub",
    svg: (
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.17c-3.338.726-4.033-1.415-4.033-1.415-.546-1.388-1.333-1.758-1.333-1.758-1.09-.745.084-.73.084-.73 1.204.085 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.52.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.657 1.657.246 2.874.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.432.372.816 1.102.816 2.222v3.293c0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
    ),
    viewBox: "0 0 24 24",
  },
  {
    name: "Shopify",
    svg: (
      <path d="M204.4 50.1c-1.6-1.2-3.5-1.8-5.5-1.8-1.1 0-2.2.2-3.3.6L69.3 91.4c-4.1 1.6-6.6 5.7-6.1 10l15.1 122.3c.5 4.3 3.9 7.6 8.3 8h.9c4.1 0 7.6-2.6 8.8-6.5L204.1 54.9c.9-3.1 0-6.3-2.4-8.1z" />
    ),
    viewBox: "0 0 256 256",
  },
];

const Visitors = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section className="bg-white py-24 border-t">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-14"
        >
          Trusted by Leading Companies
        </motion.h2>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", damping: 12, stiffness: 100 },
                },
              }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.6 },
              }}
              className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-200 hover:border-indigo-400 transition-all"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={logo.viewBox}
                className="mx-auto h-12 w-12 fill-gray-800"
              >
                {logo.svg}
              </motion.svg>
              <div className="mt-3 text-sm font-medium text-gray-600">
                {logo.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Visitors;
