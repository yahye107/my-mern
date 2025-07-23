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
import {
  Trash2,
  User,
  Mail,
  Shield,
  Loader,
  Eye,
  EyeOff,
  Search,
  UserPlus,
  MoreVertical,
  BadgeInfo,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [activeFilters, setActiveFilters] = useState({
    status: "all",
    role: "all",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { success, users } = await callGetAllUsersApi();
        if (success) {
          setUsers(users);
          setFilteredUsers(users);
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

  // Sort users
  useEffect(() => {
    if (sortConfig.key) {
      const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredUsers(sortedUsers);
    }
  }, [sortConfig]);

  // Filter users based on search term and filters
  useEffect(() => {
    let results = [...users];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (user) =>
          user.firstname.toLowerCase().includes(term) ||
          user.lastname.toLowerCase().includes(term) ||
          user.username.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.age.toString().includes(term)
      );
    }

    // Apply status filter
    if (activeFilters.status !== "all") {
      results = results.filter((user) =>
        activeFilters.status === "active" ? user.isActive : !user.isActive
      );
    }

    // Apply role filter
    if (activeFilters.role !== "all") {
      results = results.filter((user) => user.role === activeFilters.role);
    }

    setFilteredUsers(results);
  }, [searchTerm, users, activeFilters]);

  const handleDelete = async () => {
    if (!selectedUserId) return;
    try {
      const { success } = await callDeleteUserApi(selectedUserId);
      if (success) {
        setUsers((prev) => prev.filter((user) => user._id !== selectedUserId));
        setFilteredUsers((prev) =>
          prev.filter((user) => user._id !== selectedUserId)
        );
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete operation failed");
    } finally {
      setSelectedUserId(null);
    }
  };

  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: "bg-indigo-100 text-indigo-800",
      user: "bg-emerald-100 text-emerald-800",
      moderator: "bg-amber-100 text-amber-800",
      guest: "bg-gray-100 text-gray-800",
      default: "bg-blue-100 text-blue-800",
    };

    return roleConfig[role] || roleConfig.default;
  };

  const getStatusBadge = (isActive) => {
    return isActive
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex-1 overflow-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all registered users and their permissions
          </p>
        </div>
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or age..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange("status", "all")}
                  className={`px-3 py-1.5 text-sm rounded-lg ${
                    activeFilters.status === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterChange("status", "active")}
                  className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 ${
                    activeFilters.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Active
                </button>
                <button
                  onClick={() => handleFilterChange("status", "inactive")}
                  className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 ${
                    activeFilters.status === "inactive"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                  Inactive
                </button>
              </div>
            </div> */}

            {/* Role Filter */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={activeFilters.role}
                onChange={(e) => handleFilterChange("role", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="guest">Guest</option>
              </select>
            </div> */}
          </div>

          {/* <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <UserPlus className="h-4 w-4" />
              Add New User
            </button>
          </div> */}
        </div>{" "}
        {/* Status Filter */}
        {/* User Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeInfo className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Users
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        <img
                          src={user.photo || "/images/client.jpg"}
                          alt="Profile"
                          className="w-12 h-12 rounded-xl object-cover border-4 border-emerald-100 shadow-sm"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.firstname} {user.lastname}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Age: {user.age}
                        </span>
                        <span className="text-gray-300">•</span>
                        <Badge className={getStatusBadge(user.isActive)}>
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">
                          {visiblePasswords[user._id]
                            ? user.rawPassword
                            : "••••••••"}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(user._id)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          {visiblePasswords[user._id] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 flex-shrink-0"></div>
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setSelectedUserId(user._id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Delete</span>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-md bg-white border-gray-200">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-gray-900">
                            Confirm User Deletion
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600">
                            This will permanently delete {user.firstname}'s
                            account and all associated data. This action cannot
                            be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
                          <p className="text-red-700 text-sm">
                            <span className="font-medium">Warning:</span>{" "}
                            Deleting this account will remove all user data
                            including activity history and personal information.
                          </p>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchTerm
                ? `No users match your search for "${searchTerm}"`
                : "No users match your current filters"}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveFilters({ status: "all", role: "all" });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
