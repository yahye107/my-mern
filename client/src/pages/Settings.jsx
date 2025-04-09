import Header from "@/components/logcommonlayout/Header";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Palette, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  callChangeEmailApi,
  callChangePasswordApi,
  callChangeUsernameApi,
} from "@/service";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useUser } from "@/context/use_context";

const Settings = () => {
  const { user, setUser } = useUser();

  // Password change states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  // Email change states
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  // Username change states
  const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [usernamePassword, setUsernamePassword] = useState("");
  const [isLoadingUsername, setIsLoadingUsername] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    setIsLoadingPassword(true);
    try {
      const response = await callChangePasswordApi({
        oldPassword,
        newPassword,
      });
      if (response.success) {
        toast.success("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.message || "Password change failed");
      }
    } catch (error) {
      toast.error("An error occurred during password change");
    }
    setIsLoadingPassword(false);
  };

  const handleEmailChange = async () => {
    if (!newEmail || !emailPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newEmail === user?.email) {
      toast.error("New email must be different");
      return;
    }

    setIsLoadingEmail(true);
    try {
      const response = await callChangeEmailApi({
        email: newEmail,
        password: emailPassword,
      });
      if (response.success) {
        toast.success("Email updated successfully");
        setUser({ ...user, email: newEmail });
        setEmailDialogOpen(false);
        setNewEmail("");
        setEmailPassword("");
      } else {
        toast.error(response.message || "Email update failed");
      }
    } catch (error) {
      toast.error("An error occurred during email update");
    }
    setIsLoadingEmail(false);
  };

  const handleUsernameChange = async () => {
    if (!newUsername || !usernamePassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newUsername === user?.username) {
      toast.error("New username must be different");
      return;
    }

    setIsLoadingUsername(true);
    try {
      const response = await callChangeUsernameApi({
        username: newUsername,
        password: usernamePassword,
      });
      if (response.success) {
        toast.success("Username updated successfully");
        setUser({ ...user, username: newUsername });
        setUsernameDialogOpen(false);
        setNewUsername("");
        setUsernamePassword("");
      } else {
        toast.error(response.message || "Username update failed");
      }
    } catch (error) {
      toast.error("An error occurred during username update");
    }
    setIsLoadingUsername(false);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Account Settings" />
      <Toaster position="top-center" />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Account Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 text-black"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Account Information</h2>
          </div>

          <div className="space-y-4">
            {/* Email Section */}
            <div>
              <Label htmlFor="email" className="text-gray-600">
                Email Address
              </Label>
              <div className="flex gap-4">
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="bg-gray-50 border-gray-200"
                />
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => setEmailDialogOpen(true)}
                >
                  Change Email
                </Button>
              </div>
            </div>

            {/* Username Section */}
            <div>
              <Label htmlFor="username" className="text-gray-600">
                Username
              </Label>
              <div className="flex gap-4">
                <Input
                  id="username"
                  value={user?.username || ""}
                  readOnly
                  className="bg-gray-50 border-gray-200"
                />
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => setUsernameDialogOpen(true)}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 text-black"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <form
            onSubmit={handlePasswordChange}
            className="space-y-4 text-black"
          >
            <div>
              <Label htmlFor="old-password">Current Password</Label>
              <Input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white w-full"
              disabled={isLoadingPassword}
            >
              {isLoadingPassword ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </motion.div>

        {/* Preferences Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-black"
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Theme</Label>
              <Select defaultValue="system">
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
              Save Preferences
            </Button>
          </div>
        </motion.div>

        {/* Email Change Dialog */}
        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Change Email Address
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Current Password"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setEmailDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEmailChange} disabled={isLoadingEmail}>
                  {isLoadingEmail ? "Updating..." : "Update Email"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Username Change Dialog */}
        <Dialog open={usernameDialogOpen} onOpenChange={setUsernameDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Username</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Current Password"
                value={usernamePassword}
                onChange={(e) => setUsernamePassword(e.target.value)}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setUsernameDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUsernameChange}
                  disabled={isLoadingUsername}
                >
                  {isLoadingUsername ? "Updating..." : "Update Username"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Settings;
