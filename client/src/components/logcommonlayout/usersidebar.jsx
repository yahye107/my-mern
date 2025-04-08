import {
  BarChart2,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  LogOut,
  User,
  PlusCircle,
  Eye,
  Cog,
} from "lucide-react";
import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useUser } from "@/context/use_context";
import { calllogoutUserApi } from "@/service";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: BarChart2,
    color: "#6366f1",
    href: "/userdash",
  },
  {
    name: "Profile",
    icon: User, // Icon for user profile
    color: "#8B5CF6",
    href: "/userdash/profile",
  },
  {
    name: "Create Quote",
    icon: PlusCircle, // Icon for creating a new quote
    color: "#F59E0B",
    href: "/userdash/create",
  },
  {
    name: "View Quote",
    icon: Eye, // Icon for viewing the quotes
    color: "#3B82F6",
    href: "/userdash/veiw",
  },
  {
    name: "Settings",
    icon: Cog, // Icon for settings
    color: "#3B82F6",
    href: "/userdash/settings",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const handleLogout = async () => {
    try {
      const response = await calllogoutUserApi();
      if (response.success) {
        toast.success("User logged out successfully!");
        setUser(null);
        localStorage.removeItem("role");
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <motion.div
      className={`relative z-10 flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        {/* Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors mb-6"
        >
          <Menu size={24} className="text-gray-200" />
        </motion.button>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <img
            src="/images/client.jpg"
            alt="User profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
          />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="min-w-0"
              >
                <h3 className="text-gray-100 font-medium truncate">
                  {user?.username}
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  {user?.email || "admin@gmail.com"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
                whileHover={{ scale: 1.02 }}
              >
                <item.icon
                  size={20}
                  className="flex-shrink-0"
                  style={{ color: item.color }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-3 whitespace-nowrap"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}

          {/* Logout Button */}
          <motion.div
            onClick={handleLogout}
            className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-red-600/30 transition-colors mt-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <LogOut size={20} className="text-red-400 flex-shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  className="ml-3 whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
