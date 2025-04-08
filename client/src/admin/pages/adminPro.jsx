import { motion } from "framer-motion";
import { Mail, User, Shield, Calendar, Settings, Edit } from "lucide-react";
import { useUser } from "@/context/use_context";
import Header from "../componets/Header";

const AdminPro = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-700 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <Header title="Admin Profile" />

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Profile Card */}
        <motion.div
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/40 border border-gray-700/30 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col items-center w-full lg:w-1/3"
        >
          <div className="relative group mb-4">
            <img
              src={user.photo || "/images/admin.jpg"}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-emerald-500/30 shadow-lg group-hover:scale-105 transition-transform"
            />
            <button className="absolute bottom-2 right-2 bg-emerald-500/90 p-2 rounded-full hover:bg-emerald-400 transition-colors shadow">
              <Edit className="text-white w-5 h-5" />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">
            {user.firstname} {user.lastname}
          </h2>
          <div className="bg-gray-700/50 px-4 py-1 rounded-full text-emerald-400 uppercase text-sm tracking-wider flex items-center mt-1">
            <Shield className="w-4 h-4 mr-2" />
            {user.role}
          </div>

          <div className="mt-6 w-full">
            <button className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl shadow transition-all">
              <Edit className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Main Info Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/30 p-6 rounded-2xl shadow-lg hover:border-emerald-400/30 transition-all"
          >
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                Personal Information
              </h3>
            </div>
            <div className="space-y-3">
              <InfoRow label="First Name" value={user.firstname} />
              <InfoRow label="Last Name" value={user.lastname} />
              <InfoRow label="Gender" value={user.gender} />
              <InfoRow label="Age" value={user.age} />
            </div>
          </motion.div>

          {/* Account Info */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/30 p-6 rounded-2xl shadow-lg hover:border-emerald-400/30 transition-all"
          >
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                Account Details
              </h3>
            </div>
            <div className="space-y-3">
              <InfoRow label="Username" value={user.username} />
              <InfoRow
                label="Email"
                value={user.email}
                icon={<Mail className="w-4 h-4 mr-2" />}
              />
              <InfoRow
                label="Member Since"
                value={new Date(user.createdAt).toLocaleDateString()}
                icon={<Calendar className="w-4 h-4 mr-2" />}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, icon }) => (
  <div className="flex justify-between items-center border-b border-gray-700/20 py-2">
    <span className="text-sm text-gray-400 flex items-center">
      {icon}
      {label}
    </span>
    <span className="text-sm font-medium text-gray-100">{value}</span>
  </div>
);

export default AdminPro;
