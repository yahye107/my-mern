import React, { useEffect, useState } from "react";

import { callGetAllUsersApi, callDeleteUserApi } from "@/service";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2, User, Mail, Shield, Loader } from "lucide-react";
import Header from "../componets/Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { success, users } = await callGetAllUsersApi();
        if (success) {
          setUsers(users);
          setError(null);
        }
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!selectedUserId) return;
    try {
      const { success } = await callDeleteUserApi(selectedUserId);
      if (success) {
        setUsers((prev) => prev.filter((user) => user._id !== selectedUserId));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete operation failed");
    } finally {
      setSelectedUserId(null);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <Header title="User Management" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gray-400 mt-2">Manage all registered users</p>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700/50 rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30 text-red-300">
            {error}
          </div>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/30 shadow-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700/40">
                <tr>
                  {["Name", "Email", "Age", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-emerald-400" />
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-100 font-medium">
                            {user.firstname} {user.lastname}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                        <Shield className="w-4 h-4 mr-2" />
                        {user.age}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => setSelectedUserId(user._id)}
                            className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-800 border-gray-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-gray-100">
                              Confirm User Deletion
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              This will permanently delete {user.firstname}'s
                              account and all associated data. This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              className="bg-red-500/80 hover:bg-red-500 text-white"
                            >
                              Delete User
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && !loading && (
              <div className="p-12 text-center text-gray-400">
                <div className="inline-block p-4 bg-gray-700/20 rounded-full mb-4">
                  <User className="w-8 h-8" />
                </div>
                <p>No registered users found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
