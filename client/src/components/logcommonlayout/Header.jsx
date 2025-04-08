import { useUser } from "@/context/use_context";
import { motion } from "framer-motion";

import { useContext } from "react";

const Header = ({ title }) => {
  const { user } = useUser();

  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>

        <motion.div
          className="flex items-center gap-4 group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-right hidden sm:block">
            <p className="text-gray-100 font-medium truncate max-w-[160px]">
              {user?.username}
            </p>
            <p className="text-gray-400 text-sm truncate max-w-[160px]">
              {user?.email}
            </p>
          </div>
          <img
            src="/images/client.jpg"
            alt="User profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
          />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
