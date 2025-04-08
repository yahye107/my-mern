import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="info"
      className="bg-black text-gray-100 border-t border-zinc-800 relative overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTgxODE5Ii8+PHBhdGggZD0iTTAgMEgxMDBWMTAwSDBWMHpNMTAwIDEwMEgyMDBWMjAwSDEwMFYxMDB6TTIwMCAyMDBIMzAwVjMwMEgyMDBWMjAwek0zMDAgMzAwSDQwMFY0MDBIMzAwVjMwMHpNNzAwIDcwMEg4MDBWODAwSDcwMFY3MDB6TTgwMCA4MDBIOTAwVjkwMEg4MDBWODAwek05MDAgOTAwSDEwMDBWMTAwMEg5MDBWOTAwek0wIDYwMEgxMDBWNzAwSDBWNjAwek0xMDAgNzBIMjAwVjE3MEgxMDBWNzB6IiBmaWxsPSIjMjYyNjI4Ii8+PC9zdmc+')]"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.h3
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
            >
              NextCRM
            </motion.h3>
            <p className="text-zinc-400 mb-6 max-w-sm">
              Revolutionizing customer relationship management through
              AI-powered solutions and intuitive workflows.
            </p>

            {/* Newsletter Form */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Subscribe to our newsletter
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder:text-zinc-500 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-blue-600/20 cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-zinc-200">
              Solutions
            </h4>
            <ul className="space-y-3">
              {[
                "Sales Automation",
                "Marketing Tools",
                "Customer Support",
                "Analytics",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10 }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 flex items-center gap-2 transition-colors duration-200 cursor-pointer group"
                  >
                    <span className="text-blue-400 group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-zinc-200">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group">
                <Mail className="w-5 h-5 text-blue-400" />
                <a
                  href="mailto:support@nextcrm.com"
                  className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer hover:underline"
                >
                  support@nextcrm.com
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <Phone className="w-5 h-5 text-blue-400" />
                <a
                  href="tel:+15551234567"
                  className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer hover:underline"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <MapPin className="w-5 h-5 text-blue-400" />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer hover:underline"
                >
                  San Francisco, CA
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-zinc-200">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Facebook, link: "#" },
                { icon: Twitter, link: "#" },
                { icon: Linkedin, link: "#" },
                { icon: Github, link: "#" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-zinc-800 border border-zinc-700 hover:border-blue-500 hover:text-blue-400 text-zinc-300 transition-all duration-200 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Awards/Badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                <span>🏆 #1 CRM Solution 2024</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                <span>⭐ 4.9/5 (2k+ Reviews)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
            <div className="order-2 md:order-1">
              © {new Date().getFullYear()} NextCRM. All rights reserved.
            </div>
            <div className="order-1 md:order-2 flex gap-4">
              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-200 cursor-pointer hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-200 cursor-pointer hover:underline"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-200 cursor-pointer hover:underline"
              >
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
