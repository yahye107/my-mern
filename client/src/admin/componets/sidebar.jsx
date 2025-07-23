import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  BarChart2,
  User,
  PlusCircle,
  Eye,
  Cog,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Users,
  FileText,
  Settings,
} from "lucide-react";

import { useUser } from "@/context/use_context";
import { calllogoutUserApi } from "@/service";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: BarChart2, // Icon for dashboard (charts, analytics)
    color: "#6366f1",
    href: "/admindash",
  },
  {
    name: "Users",
    icon: Users, // Icon for user management (people, users)
    color: "#8B5CF6",
    href: "/admindash/user",
  },
  {
    name: "Manage Quote",
    icon: FileText, // Icon for managing quotes (documents)
    color: "#F59E0B",
    href: "/admindash/manage",
  },
  {
    name: "Admin Profile",
    icon: Settings, // Icon for admin settings (configuration, profile)
    color: "#3B82F6",
    href: "/admindash/settings",
  },
  {
    name: "Logout",
    icon: LogOut,
    href: "/logout",
    color: "#EF4444", // red-500
  },
];

const Sidebar = ({ onItemClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // const handleLogout = async () => {
  //   try {
  //     const response = await calllogoutUserApi();
  //     if (response.success) {
  //       setUser(null);
  //       navigate("/auth");
  //       toast.success("Logged out successfully!");
  //     }
  //   } catch (error) {
  //     toast.error("Logout failed. Please try again.");
  //   }
  // };

  return (
    <motion.div
      initial={{ width: isSidebarOpen ? 240 : 80 }}
      animate={{ width: isSidebarOpen ? 240 : 80 }}
      className={`relative h-full bg-white text-gray-800 flex flex-col border-r border-gray-200 shadow-sm transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="bg-indigo-500 w-8 h-8 rounded-md flex items-center justify-center">
                <span className="font-bold text-white text-lg">C</span>
              </div>
              <h1 className="text-xl font-bold text-indigo-600">CRM</h1>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-100">
        <div className="relative">
          <img
            src={user?.photo || "/images/client.jpg"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
        </div>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="overflow-hidden"
            >
              <h3 className="font-semibold text-gray-900 truncate">
                {user?.username || "Guest User"}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "user@example.com"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate(item.href);
              onItemClick?.();
            }}
            className={`w-full flex items-center p-3 rounded-lg transition-all ${
              location.pathname === item.href
                ? "bg-indigo-50 border-l-4 border-indigo-500"
                : "hover:bg-gray-50"
            }`}
          >
            <item.icon
              size={20}
              style={{ color: item.color }}
              className="flex-shrink-0"
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3 text-sm font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Footer logout (always sticks at bottom) */}
      {/* <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
        >
          <LogOut size={20} />
          {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div> */}

      {/* Close button for mobile */}
      <button
        onClick={onItemClick}
        className="absolute top-3 right-3 md:hidden p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export default Sidebar;
