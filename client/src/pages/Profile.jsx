import { useState, useRef } from "react";
import { User, Shield, Settings, Edit, Mail, Loader2 } from "lucide-react";
import { useUser } from "@/context/use_context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { callUpdatePhotoApi } from "@/service";

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const data = await callUpdatePhotoApi(file);
      toast.success("Photo updated!");
      setUser((prev) => ({ ...prev, photo: data.photo }));
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to update profile photo"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!user) return <GlobalLoading />;

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="relative">
              {isUploading ? (
                <div className="w-28 h-28 rounded-xl border-4 border-emerald-100 bg-gray-100 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                </div>
              ) : (
                <>
                  <img
                    src={user.photo || "/images/client.jpg"}
                    alt="Profile"
                    className="w-28 h-28 rounded-xl object-cover border-4 border-emerald-100 shadow-sm"
                  />
                  <button
                    className="absolute bottom-1 right-1 p-1.5 bg-emerald-500 rounded-md hover:bg-emerald-600 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {user.firstname} {user.lastname}
              </h1>
              <div className="inline-flex items-center bg-emerald-50 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 mr-1.5 text-emerald-600" />
                <span className="text-emerald-600 font-medium text-sm">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Personal Info Card */}
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-5">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h3>
              </div>
              <div className="space-y-3">
                <InfoRow label="First Name" value={user.firstname} />
                <InfoRow label="Last Name" value={user.lastname} />
                <InfoRow label="Gender" value={user.gender} />
                <InfoRow label="Age" value={user.age} />
              </div>
            </div>

            {/* Account Card */}
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-5">
                <Settings className="w-5 h-5 mr-2 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Details
                </h3>
              </div>
              <div className="space-y-3">
                <InfoRow label="Username" value={user.username} />
                <InfoRow
                  label="Email"
                  value={user.email}
                  icon={<Mail className="w-4 h-4 mr-1 text-gray-500" />}
                />
                <InfoRow
                  label="Member Since"
                  value={new Date(user.createdAt).toLocaleDateString()}
                />
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate("/userdash/settings")}
                    className="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4 mr-1.5" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, icon }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-600 flex items-center">
      {icon}
      {label}
    </span>
    <span className="text-gray-800 font-medium text-sm">{value}</span>
  </div>
);

export default Profile;
