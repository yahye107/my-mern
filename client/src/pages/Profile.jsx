import { motion } from "framer-motion";
import { Mail, User, Shield, Calendar, Settings, Edit } from "lucide-react";
import { useUser } from "@/context/use_context";
import Header from "@/components/logcommonlayout/Header";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
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
    <div className="flex-1 overflow-auto relative z-10 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header title="Admin Profile" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700/30 transform transition-all hover:scale-[1.005]"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <div className="relative group">
              <img
                src={user.photo || "/images/client.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-2xl object-cover border-4 border-emerald-400/20 shadow-xl transition-transform group-hover:scale-105"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-emerald-500/90 rounded-lg shadow-md hover:bg-emerald-400 transition-colors">
                <Edit className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-100 mb-2 tracking-tight">
                {user.firstname} {user.lastname}
              </h1>
              <div className="inline-flex items-center bg-gray-700/40 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                <span className="text-emerald-400 font-medium uppercase text-sm tracking-wide">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Info Card */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700/20 p-6 rounded-xl border border-gray-700/30 hover:border-emerald-400/20 transition-all"
            >
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 mr-3 text-emerald-400" />
                <h3 className="text-xl font-semibold text-gray-100">
                  Personal Information
                </h3>
              </div>
              <div className="space-y-4">
                <InfoRow label="First Name" value={user.firstname} />
                <InfoRow label="Last Name" value={user.lastname} />
                <InfoRow label="Gender" value={user.gender} />
                <InfoRow label="Age" value={user.age} />
              </div>
            </motion.div>

            {/* Account Card */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700/20 p-6 rounded-xl border border-gray-700/30 hover:border-emerald-400/20 transition-all"
            >
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 mr-3 text-emerald-400" />
                <h3 className="text-xl font-semibold text-gray-100">
                  Account Details
                </h3>
              </div>
              <div className="space-y-4">
                <InfoRow label="Username" value={user.username} />
                <InfoRow
                  label="Email"
                  value={user.email}
                  icon={<Mail className="w-4 h-4 mr-2" />}
                />
                <InfoRow
                  label="Member Since"
                  value={new Date(user.createdAt).toLocaleDateString()}
                />
                <div className="pt-4 border-t border-gray-700/30">
                  <button
                    onClick={() => navigate("/userdash/settings")}
                    className="w-full flex items-center justify-center bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg transition-all"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, icon }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-700/20">
    <span className="text-sm text-gray-400 flex items-center">
      {icon}
      {label}
    </span>
    <span className="text-gray-100 font-medium">{value}</span>
  </div>
);

export default Profile;
